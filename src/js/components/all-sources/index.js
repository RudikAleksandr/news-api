import { createNode } from '../../utils/node-util';
import * as EventHandlers from './events-all-sources';

export default class AllSources {
  static get NAME_CLASS_CURENT_NODE() {
    return 'all-sources__curent-item';
  }

  static get DATA_ID_SOURCE() {
    return 'data-id-source';
  }

  constructor(nodeSelector) {
    this.nodeSources = document.querySelector(nodeSelector);
    this.sourcesContainer = null;
    this.curentNode = null;

    document.querySelector(nodeSelector)
      .onclick = EventHandlers.handlerClick.bind(this);
  }

  set sources(sources) {
    this.sourcesContainer = sources;
  }

  set clickCurentNode(curentNode) {
    if (this.curentNode) {
      this.curentNode.classList.remove(AllSources.NAME_CLASS_CURENT_NODE);
    }
    this.curentNode = curentNode;
    this.curentNode.classList.add(AllSources.NAME_CLASS_CURENT_NODE);
  }

  get idCurrentSource() {
    const currentNode = this.nodeSources
      .querySelector(`.${AllSources.NAME_CLASS_CURENT_NODE}`);

    return currentNode.getAttribute(AllSources.DATA_ID_SOURCE);
  }

  createSources() {
    const fragmentContainerList = new DocumentFragment();

    this.sourcesContainer.forEach((source) => {
      const nodeLI = createNode({
        tagName: 'li',
        innerText: source.name,
        className: 'all-sources__item',
        attrs: { [AllSources.DATA_ID_SOURCE]: source.id },
      });

      fragmentContainerList.appendChild(nodeLI);
    });

    return fragmentContainerList;
  }

  viewSources() {
    const fragmentSources = this.createSources();
    this.nodeSources.appendChild(fragmentSources);
  }
}
