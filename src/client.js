/**
 * Note that this is not a React component
 * Client gets created in Dialog.js and is used to interface with the Unsplash api
 *
 * TO DO: research the Unsplash SDK and see if it might make more sense to use that
 * versus hand rolling this client
 * https://github.com/unsplash/unsplash-js#search
 */
export default class Client {
  UNSPLASH_HOST = 'https://api.unsplash.com';

  /** token = string */
  constructor(token) {
    if (!token) {
      throw new Error('You must provide an Unsplash token!');
    }

    this.token = token;
  }

  /** value = string */
  async search(value) {
    const res = await fetch(
      `${this.UNSPLASH_HOST}/search/photos?page=1&query=${encodeURIComponent(
        value
      )}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${this.token}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();

      return {
        error: false,
        photos: data.results,
      };
    }

    return {
      error: true,
      photos: [],
    };
  }
}
