const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Orden = require('../models/order');
const app = express();

app.get('/orders', function(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 50;
  limite = Number(limite);
  Orden.find(null)
    .skip(desde)
    .limit(limite)
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      Orden.count(null, (err, length) => {
        res.json({
          ok: true,
          orders,
          length
        });
      });
    });
});

app.post('/order', function(req, res) {
  let body = req.body;
  let orden = new Orden({
      merkat: body.merkat,
      number: body.number,
      price: body.price,
      money: body.money,
  });
  orden.save((err, ordenDB) => {
    if (err) {
      return res.status(400).json({
          ok: false,
          err
      });
    }
    res.json({
      ok: true,
      orden: ordenDB
    });
  });
});
//
// app.put('/usuario/:id', function(req, res) {
//
//     let id = req.params.id;
//     let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
//
//     Orden.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
//
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//
//
//
//         res.json({
//             ok: true,
//             usuario: usuarioDB
//         });
//
//     })
//
// });
//
// app.delete('/usuario/:id', function(req, res) {
//
//
//     let id = req.params.id;
//
//     // Orden.findByIdAndRemove(id, (err, usuarioBorrado) => {
//
//     let cambiaEstado = {
//         estado: false
//     };
//
//     Orden.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
//
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         };
//
//         if (!usuarioBorrado) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Orden no encontrado'
//                 }
//             });
//         }
//
//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         });
//
//     });



// });



module.exports = app;
