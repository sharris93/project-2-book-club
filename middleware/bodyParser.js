import querystring from 'querystring';

export default function bodyParser(req, res, next) {
  const contentType = req.headers['content-type'];

  // Parse application/x-www-form-urlencoded
  if (contentType && contentType.startsWith('application/x-www-form-urlencoded')) {
    console.log('PARSING THE DATA')
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      req.body = querystring.parse(data);
    });
  }
  next();
}