import { render } from '@testing-library/react';
import Post, { getStaticProps } from '../../pages/posts/[slug]';
import { mocked } from 'ts-jest/utils'
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'test-new-post',
  title: 'Title for new post',
  content: '<p>Post content</p>',
  updateAt: '25 de dezembro de 2021',
}

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        isFallback:false,
      }
    }
  }
});


jest.mock('../../services/prismic');

describe('Post page', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Post post={post} />);

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  test('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'Title for new post' }],
          content: [{ type: 'paragraph', text: '<p>Post content</p>' }],
        },
        last_publication_date: '12-25-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: 'test-new-post' }
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post:
          {
            slug: 'test-new-post',
            title: 'Title for new post',
            content: '<p>Post content</p>',
            updateAt: '25 de dezembro de 2021',
          },
        },
      }),
    );
  });
});