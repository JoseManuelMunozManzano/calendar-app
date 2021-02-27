import { fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {
  test('fetchSinToken debe de funcionar', async () => {
    const resp = await fetchSinToken(
      'auth',
      {
        email: 'jose@hotmail.com',
        password: '123456',
      },
      'POST'
    );

    // console.log(process.env.NODE_ENV);
    // console.log(process.env.REACT_APP_API_URL);

    expect(resp instanceof Response).toBe(true);

    // console.log(resp);
    const body = await resp.json();
    expect(body.ok).toBe(true);
  });
});
