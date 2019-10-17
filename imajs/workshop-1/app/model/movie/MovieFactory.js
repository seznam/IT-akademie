import MovieEntity from 'app/model/movie/MovieEntity';

export default class MovieFactory {
  static get $dependencies() {
    return [];
  }

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
   *        }} entityData
   * @return {MovieEntity}
   */
  createEntity(entityData) {
    // WORKSHOP: implement
  }

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
   *        }[]} entitiesData
   * @return {MovieEntity[]}
   */
  createEntities(entitiesData) {
    // WORKSHOP: implement
  }
}
