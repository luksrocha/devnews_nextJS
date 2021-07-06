import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});


describe('Header component', () => {

  test('render correctly', () => {
    const { getByText, getByAltText } = render(
      <Header />
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
    expect(getByAltText('DevNews')).toBeInTheDocument();
  });

});

