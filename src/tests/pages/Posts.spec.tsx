import { render } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { mocked } from 'ts-jest/utils'
import { getPrismicClient } from '../../services/prismic';

const posts = [
  {
    slug: 'test-new-post',
    title: 'Title for new post',
    excerpt: 'Post excerpt',
    updateAt: '25 de dezembro de 2021',
  },
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Posts posts={posts} />);

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My new Post' }],
              content: [{ type: 'paragraph', text: 'Post excerpt' }],
            },
            last_publication_date: '12-25-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new Post',
              excerpt: 'Post excerpt',
              updateAt: '25 de dezembro de 2021',
            },
          ],
        },
      }),
    );
  });
});