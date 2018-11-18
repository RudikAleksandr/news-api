
function createNode({
  tagName, innerText, innerHTML, className, attrs,
}) {
  const node = document.createElement(tagName);

  if (className) {
    node.classList.add(className);
  }

  if (innerText) {
    node.innerText = innerText;
  }

  if (innerHTML) {
    node.innerHTML = innerHTML;
  }

  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      node.setAttribute(attr, attrs[attr]);
    });
  }


  return node;
}

export {
  createNode,
};
