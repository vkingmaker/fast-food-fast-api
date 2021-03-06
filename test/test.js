'use strict';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// var Order = require('../src/mock/db');
let server = require('../src/index');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Order', () => {
  beforeEach((done) => { //Before each test we empty the database
    done();
  });

  /*
   * Test the /GET route
   */
  describe('/GET order', function () {
    it('it should GET all the orders', function (done) {
      chai.request(server)
        .get('/order')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(5);
          done();
        });
    });
  });
});

/*
 * Test the /POST route
 */
describe('/POST order', () => {
  it('it should POST an Order if the ORDER property has a value', (done) => {
    let order = {
      "id": 1,
      "Date": "8/30/2018",
      "Name": "Monday Victor Akubudike",
      "Address": "7b Oyadiran Estate Sabo, Yaba",
      "Tel.No": "07031977216",
      "status": "pending"
    }
    chai.request(server)
      .post('/order')
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should POST an order ', (done) => {
    let order = {
      "id": 1,
      "Date": "8/30/2018",
      "Name": "Monday Victor Akubudike",
      "Address": "7b Oyadiran Estate Sabo, Yaba",
      "Tel.No": "07031977216",
      "Order": "Fried Rice with chicken",
      "Instruction": "I love my chicken spicy and grilled",
      "status": "pending"
    }
    chai.request(server)
      .post('/order')
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Your order has been placed!');
        res.body.addedOrder.should.have.property('id');
        res.body.addedOrder.should.have.property('Name');
        res.body.addedOrder.should.have.property('Address');
        res.body.addedOrder.should.have.property('Tel.No');
        res.body.addedOrder.should.have.property('Order');
        res.body.addedOrder.should.have.property('Instruction');
        res.body.addedOrder.should.have.property('status');
        done();
      });
  });
});

/*
 * Test the /GET/:id route
 */
describe('/GET/:id order', () => {
  it('it should GET an order by the given id', (done) => {
    let order = {
      "id": 2,
      "Date": "8/30/2018",
      "Name": "Ufomba Victoria",
      "Address": "1b Nweke street Aba, Abia State",
      "Tel.No": "07061277913",
      "Order": "Nsala and fufu",
      "Instruction": "should be served HOT",
      "status": "Accepted"
    }
    chai.request(server)
      .get('/order/' + order.id)
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('Date');
        res.body[0].should.have.property('Name');
        res.body[0].should.have.property('Address');
        res.body[0].should.have.property('id').eql(order.id);
        done();
      });
  });
});

 /*
   * Test the /PUT/:id route
   */
describe('/PUT/:id book', () => {
  it('it should UPDATE an order given the id', (done) => {
    let order = {
      "id": 2,
      "Date": "8/30/2018",
      "Name": "Ufomba Victoria",
      "Address": "1b Nweke street Aba, Abia State",
      "Tel.No": "07061277913",
      "Order": "Nsala and fufu",
      "Instruction": "should be served HOT",
      "status": "pending"
    }
    chai.request(server)
      .put('/order/' + order.id)
      .send({
        "id": 2,
        "Date": "8/30/2018",
        "Name": "Ufomba Victoria Monday",
        "Address": "1b Nweke street Aba, Abia State",
        "Tel.No": "07061277913",
        "Order": "Nsala and fufu",
        "Instruction": "should be served HOT",
        "status": "Accepted"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(`Your Order has been Updated id ${order.id}`);
        res.body.updatedOrder.should.have.property('status').eql('Accepted');
        done();
      });
  });
});

 /*
   * Test the /DELETE/:id route
   */
describe('/DELETE/:id order', () => {
it('it should DELETE an order given the id', (done) => {
  let order = {
    "id": 2,
    "Date": "8/30/2018",
    "Name": "Ufomba Victoria",
    "Address": "1b Nweke street Aba, Abia State",
    "Tel.No": "07061277913",
    "Order": "Nsala and fufu",
    "Instruction": "should be served HOT",
    "status": "Accepted"
  }
    chai.request(server)
      .delete('/order/' + order.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(`Order Deleted Successfully id ${order.id}`);
        done();
      });
  });
});

 /*
   * Test the /DELETE route
   */
describe('/DELETE order', () => {
  it('it should DELETE all the orders in the JSON file', (done) => {
      chai.request(server)
        .delete('/order')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('The Order List has been Emptied successfully!');
          res.body.order.should.be.a('array');
          done();
        });
    });
  });

