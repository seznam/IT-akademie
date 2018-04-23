import React from 'react';
import Renderer from 'react-test-renderer';
import Movie from '~/ui/molecule/Movie';

describe('Movie', () => {
  it('should render correctly', () => {
    const movie = {
      url: 'some-movie-url-slug',
      images: [
        {
          src: 'some-image.jpg',
          width: 640,
          height: 300,
        },
      ],
      title: 'FooBar movie',
      perex: 'Lorem ipsum dolor sit amet',
    };
    const domTree = Renderer.create(<Movie movie={movie}/>).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
