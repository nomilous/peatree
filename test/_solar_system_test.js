objective('SolarSystem', function(path) {

  var SOURCE = path.normalize(__dirname + '/../sample/solar_system');
  var MOUNT = path.normalize(__dirname + '/_temp/solar_system');

  before(function() {
    mock('ntree', require('../'));
    mock('expect', require('chai').expect);
  });

  beforeEach('clear test directory', function(done, rimraf) {
    rimraf(MOUNT, done);
  });

  beforeEach('create test directory', function(done, mkdirp) {
    mkdirp(MOUNT, done);
  });

  beforeEach('install solar system', function(done, cpr) {
    cpr(SOURCE, MOUNT, done);
  });

  afterEach('remove solar system', function(done, rimraf) {
    rimraf(MOUNT, done);
  });

  beforeEach('create expected system', function() {
    mock('SolarSystem', {
      dwarf_planets: {
        makemake: {
          name: "Makemake",
          radius: 739000
        },
        eris: {
          name: "Eris",
          radius: 1163000
        },
        pluto: {
          name: "Pluto",
          radius: 1186000
        }
      },
      planets: {
        inner: {
          venus: {
            name: "Venus",
            radius: 6052000
          },
          earth: {
            name: "Earth",
            radius: 6371000
          },
          mars: {
            name: "Mars",
            radius: 3390000
          },
          mercury: {
            name: "Mercury",
            radius: 2440000
          }
        },
        outer: {
          saturn: {
            name: "Saturn",
            radius: 58232000
          },
          uranus: {
            name: "Uranus",
            radius: 25362000
          },
          neptune: {
            name: "Neptune",
            radius: 24622000
          },
          jupiter: {
            name: "Jupiter",
            radius: 69911000
          }
        }
      },
      sun: {
        name: "Sun",
        radius: 696000000
      }
    });
  });


  it('loads the solar system ok',
    function(done, expect, ntree, SolarSystem) {
      ntree.create(MOUNT).then(function(tree) {
        expect(JSON.parse(JSON.stringify(tree))).to.eql(SolarSystem);
        tree._stop();
        done();
      }).catch(done);
  });


  context('syncIn', function() {

    context('new source files/dirs', function() {
      it('');
    });

    context('changed source files/dirs', function() {
      it('');
    });

    context('deleted source files/dirs', function() {

      it('deletes from tree when source deleted (file, no path overlap, nested)',
        // deletes pluto.js (has no overlap with directory or other js files)
        function(done, expect, ntree, SolarSystem, fs, path) {
          ntree.create(MOUNT).then(function(tree) {

            var tref = tree.dwarf_planets.pluto; // these get deleted when file is deleted
            var vref = tree._vertices.dwarf_planets.pluto;

            delete SolarSystem.dwarf_planets.pluto; // delete from test reference

            var plutojs = path.normalize(MOUNT + '/dwarf_planets/pluto.js');
            var listener;
            tree.on('$unload', listener = function(source) {
              tree._emitter.removeListener('$unload', listener);
              try {
                expect(JSON.stringify(tree)).to.equal(JSON.stringify(SolarSystem));
                expect(tree._vertices.dwarf_planets.pluto).to.not.exist;

                expect(vref.__.deleted).to.be.true;
                expect(vref.name.__.deleted).to.be.true;
                expect(vref.radius.__.deleted).to.be.true;
              } catch (e) {
                tree._stop();
                return done(e);
              }
              tree._stop();
              done();
            });

            fs.unlink(plutojs, function(err) {
              if (err) return done(err);
            });
          }).catch(done);
      });

      it('deletes from tree when source deleted (file, has path overlap, nested)',
        // deletes inner.js which overlaps paths all the way to inner/earth/radius
        function(done, expect, ntree, SolarSystem, fs, path) {
          done();
      });

      xit('deletes from tree when source deleted (file, has path overlap, root)',
        // deletes planets.js which overlaps extensively and is a key on the root
        function(done) {
      });

      xit('deletes from tree when source deleted (directory, no overlap, nested)',
        // deletes dwarf_planets/makemake which has no overlaps defined in ancestor
        function(done) {

      });

      xit('deletes from tree when source deleted (directory, no overlap, root)',
        // deletes dwarf_planets which has no overlaps defined in ancestor and is a key on root
        function(done) {

      });

      xit('deletes from tree when source deleted (directory, has path overlap, nested)',
        // deletes planets/inner which has much overlap defined in ancestor
        function(done) {
          
      });

      xit('deletes from tree when source deleted (directory, no path overlap, root)',
        // deletes sun which has overlaps defined in ancestor and is a key on root
        function(done) {
          
      });

    });


  });


});
