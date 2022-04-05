// import db from '../models/index.mjs';

// export default function initUserController(db) {

// // create new user
// const newUser = await db.User.create({
//   email: 'req.body.email',
//   password: 'req.body.password',
//   win: '0',
//   loss: '0',
//   draw: '0',
//   rank: 'Beginner',
// });

//   // find all details of user that is currently logged in
//   const userInfo = (req, res) => {
//     db.User.findAll({
//       where: {
//         id: req.params.id,
//       },
//     })
//       .then((user) => {
//         res.render('/userInfo', { user });
//       })
//       .catch((error) => console.log('error', error));
//   };

//   return {
//     userInfo,
//   };
// }
