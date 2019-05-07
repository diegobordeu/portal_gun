var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
let placeId = 1;
let urlTarget = `https://accionetdev.herokuapp.com/welcome/places/${placeId}/render?is_initial=true`;
// https://accionetdev.herokuapp.com/welcome/places/$PLACE-ID$/render?is_initial=true&person=T-$(mac-esc)&burl=$(link-login-only

router.get('/set_url/', (req, res, next) => {
  if (!req.query || ! req.query.url) return res.status(500).send('define url in query');
  urlTarget = req.query.url;
  return res.status(200).send(`OK ${urlTarget}`);
});

router.get('/set_place_id/', (req, res, next) => {
  if (!req.query || ! req.query.place_id) return res.status(500).send('define place_id in query');
  placeId = req.query.place_id;
  return res.status(200).send(`OK ${placeId}`);
});

router.get('/place_id/', (req, res, next) => {
  return res.status(200).send(`OK ${placeId}`);
});

router.get('/url/', (req, res, next) => {
  return res.status(200).send(`OK ${urlTarget}`);
});

router.get('/guest/s/:token/', (req, res, next)=>{
  const query = req.query;
  const {ap} = query;
  const macAddress = query.id;
  const {t} = query;
  const {url} = query;
  return res.redirect(`${urlTarget}&ap=${ap}&person=T-${macAddress}&t=${t}&url=${url}`);
});

module.exports = router;
