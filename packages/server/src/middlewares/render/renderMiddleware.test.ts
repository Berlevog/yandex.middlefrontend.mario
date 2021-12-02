import { renderPage } from './renderPage';

test('should create safe html', () => {
  const meta = '<meta>meta</meta>';
  const css = '<style>style</style>';
  const reactHtml = '<body>body</body>';
  const reduxState = JSON.stringify({
    arr: ['foo', 'bar'],
    obj: {
      foo: 1,
      bar: 1,
    },
    str: 'foo bar',
  });
  // const scripts = '<script>window</script>';
  const nonce = 'nonce';

  expect(
    renderPage({ meta, css, reactHtml, reduxState, nonce })
  ).toMatchSnapshot();
});
