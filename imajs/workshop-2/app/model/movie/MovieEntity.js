import AbstractEntity from 'app/model/AbstractEntity';

export default class MovieEntity extends AbstractEntity {
  /**
   * @param {{
   *          id: number,
   *          title: string,
   *          url: string,
   *          rating: number,
   *          category: number,
   *          images: {src: string, width: number, height: number}[],
   *          video: {src: string, width: number, height: number}[],
   *          date: string,
   *          actors: string[],
   *          perex: string,
   *          description: string
   *        }} data
   */
  constructor(data) {
    super();

    /**
     * @type {number}
     */
    this.id = data.id;

    /**
     * @type {string}
     */
    this.title = data.title;

    /**
     * @type {string}
     */
    this.url = data.url;

    /**
     * @type {number}
     */
    this.rating = data.rating;

    /**
     * @type {number}
     */
    this.category = data.category;

    /**
     * @type {{src: string, width: number, height: number}[]}
     */
    this.images = data.images;

    /**
     * @type {{src: string, width: number, height: number}[]}
     */
    this.video = data.video;

    let dateParts = data.date.split('-');

    /**
     * @type {Date}
     */
    this.date = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );

    /**
     * @type {string[]}
     */
    this.actors = data.actors;

    /**
     * @type {string}
     */
    this.perex = data.perex;

    /**
     * @type {string}
     */
    this.description = data.description;

    if ($Debug) {
      Object.freeze(this);
    }
  }
}
