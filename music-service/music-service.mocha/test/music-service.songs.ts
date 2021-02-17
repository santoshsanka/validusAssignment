//Dependencies
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { expect } from 'chai';
const should = chai.should();

//Environment Variables
import { configEnv } from '../config.env';
import { lstat } from 'fs';
const env = configEnv['local'];
describe('Music Service Songs:', function () {

  describe('Music Service - Get Songs', function () {

    it('Should successfully get a list of Songs', function (done) {
      chai.request(env.url)
        .get('/Songs')
        .end(function (err, res) {
          console.log (res.body)
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    })

    it('Should sort by track in an album in descending order',function(done){
      var queryParms = {
        "album_id":5,"_sort":"track","_order":"desc"
      }
      var expectedResult = [
        { album_id: 5, track: 10, id: 51, name: 'Goodnight, Travel Well' },
        { album_id: 5, track: 9, id: 50, name: 'The World We Live In' },
        { album_id: 5, track: 8, id: 49, name: 'Neon Tiger' },
        { album_id: 5, track: 7, id: 48, name: "I Can't Stay" },
        { album_id: 5, track: 6, id: 47, name: 'This Is Your Life' },
        { album_id: 5, track: 5, id: 46, name: 'A Dustland Fairytale' },
        { album_id: 5, track: 4, id: 45, name: 'Joy Ride' },
        { album_id: 5, track: 3, id: 44, name: 'Spaceman' },
        { album_id: 5, track: 2, id: 43, name: 'Human' },
        { album_id: 5, track: 1, id: 42, name: 'Losing Touch' }
      ]
      chai.request(env.url)
        .get('/Songs')
        .set("Authorization", "Bearer " + env.token)
        .query(queryParms)
        .end(function (err, res) {
          console.log (res.body)
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body).to.eql(expectedResult);
          done();
        });
    })

    it('Should get 10 songs by default on pagination',function(done){
      var queryParms = {
        "_page":1
      }
      chai.request(env.url)
        .get('/Songs')
        .set("Authorization", "Bearer " + env.token)
        .query(queryParms)
        .end(function (err, res) {
          console.log (res.body)
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.lengthOf(10);
          done();
        });
    })

    it('Should get number of songs based on user configuration',function(done){
      var queryParms = {
        "_page":1, "_limit":"20"
      }
      chai.request(env.url)
        .get('/Songs')
        .set("Authorization", "Bearer " + env.token)
        .query(queryParms)
        .end(function (err, res) {
          console.log (res.body)
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.lengthOf(20);
          done();
        });
    })
    it('Should get 10 songs by default on pagination',function(done){
      var queryParms = {
        "_page":1
      }
      chai.request(env.url)
        .get('/Songs')
        .set("Authorization", "Bearer " + env.token)
        .query(queryParms)
        .end(function (err, res) {
          console.log (res.body)
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.lengthOf(10);
          done();
        });
    })
// Cannot filter songs by album name or artist name.
    it('Should be filter songs by album ID',function(done){
      var queryParms = {
        "album_id":1
      }
      chai.request(env.url)
        .get('/Songs')
        .set("Authorization", "Bearer " + env.token)
        .query(queryParms)
        .end(function (err, res) {
          console.log (res.body)
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.lengthOf(9);
          done();
        });
    })

  });
});


