import AbstractController from 'ima/controller/AbstractController';
import Dictionary from 'ima/dictionary/Dictionary';
import MetaManager from 'ima/meta/MetaManager';
import Router from 'ima/router/Router';

export default class AbstractPageController extends AbstractController {
  /**
   * Set seo params.
   *
   * @param {Object<string, *>} loadedResources
   * @param {MetaManager} metaManager
   * @param {Router} router
   * @param {Dictionary} dictionary
   * @param {Object<string, *>} settings
   */
  setMetaParams(loadedResources, metaManager, router, dictionary, settings) {
    let title = 'Seznam.cz IT Akademie 2016';
    let description;
    description = 'Seznam.cz IT Akademie 2016';
    let domain = router.getDomain();
    let image = `${domain}${settings.$Static.image}/imajs-share.png`;

    let url = router.getUrl();

    metaManager.setTitle(title);

    metaManager.setMetaName('description', description);
    metaManager.setMetaName(
      'keywords',
      'IMA.js, isomorphic application, javascript, Seznam.cz'
    );

    metaManager.setMetaName('twitter:title', title);
    metaManager.setMetaName('twitter:description', description);
    metaManager.setMetaName('twitter:card', 'summary');
    metaManager.setMetaName('twitter:image', image);
    metaManager.setMetaName('twitter:url', url);

    metaManager.setMetaProperty('og:title', title);
    metaManager.setMetaProperty('og:description', description);
    metaManager.setMetaProperty('og:type', 'website');
    metaManager.setMetaProperty('og:image', image);
    metaManager.setMetaProperty('og:url', url);
  }
}
