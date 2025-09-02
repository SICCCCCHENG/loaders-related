const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

function loader(source) {
  const absPath = this.resourcePath;

  const ast = parser.parse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  // 在本文件定义的 PascalCase 组件上，把 props.path 直接注入到 return 根 JSX
  const isPascalCase = (name) => /^[A-Z][A-Za-z0-9_]*$/.test(name);
  const propsPathExpr = t.memberExpression(t.identifier("props"), t.identifier("path"));

  console.log(propsPathExpr,'propsPathExpr');
  
  const injectPathIntoReturnRoot = (fnPath) => {
    fnPath.traverse({
      ReturnStatement(retPath) {
        const arg = retPath.node.argument;
        if (t.isJSXElement(arg)) {
          const opening = arg.openingElement;
          let idx = -1;
          for (let i = 0; i < opening.attributes.length; i++) {
            const attr = opening.attributes[i];
            if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name) && attr.name.name === "path") {
              idx = i;
              break;
            }
          }
          const nextAttr = t.jsxAttribute(
            t.jsxIdentifier("path"),
            t.jsxExpressionContainer(propsPathExpr)
          );
          if (idx >= 0) {
            opening.attributes[idx] = nextAttr;
          } else {
            opening.attributes.push(nextAttr);
          }
        }
      },
    });
  };

  traverse(ast, {
    FunctionDeclaration(fnPath) {
      if (fnPath.node.id && isPascalCase(fnPath.node.id.name)) {
        injectPathIntoReturnRoot(fnPath);
      }
    },
    VariableDeclarator(varPath) {
      if (
        t.isIdentifier(varPath.node.id) &&
        isPascalCase(varPath.node.id.name) &&
        (t.isArrowFunctionExpression(varPath.node.init) || t.isFunctionExpression(varPath.node.init))
      ) {
        const init = varPath.node.init;
        const params = init.params || [];
        // const expr = getPathExpressionFromParams(params);
        injectPathIntoReturnRoot(varPath, '');
      }
    },
  });

  // 再处理：对所有大写开头的 JSX 标签补充绝对路径 path="..."（若仍未声明）
  traverse(ast, {
    JSXOpeningElement(path) {
      const tag = path.node.name;
      let tagName = "";
      if (t.isJSXIdentifier(tag)) {
        tagName = tag.name;
      } else if (t.isJSXMemberExpression(tag)) {
        tagName = `${tag.object.name}.${tag.property.name}`;
      }
      if (/^[A-Z]/.test(tagName)) {
        const hasPathProp = path.node.attributes.some(
          (attr) => t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name) && attr.name.name === "path"
        );
        if (!hasPathProp) {
          path.node.attributes.push(
            t.jsxAttribute(t.jsxIdentifier("path"), t.stringLiteral(absPath))
          );
        }
      }
    },
  });

  const temp = generate(ast, {}, source).code;

  console.log(temp, 'temp');
  
  return temp
}

module.exports = loader;
