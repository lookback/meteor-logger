Should = should()

describe 'Logger', ->

  beforeEach ->
    spies.create 'info', console, 'info'
    spies.create 'warn', console, 'warn'
    spies.create 'debug', console, 'log'
    spies.create 'error', console, 'error'

  afterEach ->
    spies.restoreAll()

  it 'should exist as an object', ->
    Logger.should.be.defined
    Logger.should.be.an 'object'

  it 'should log locally per default', ->
    Logger.info 'Foo'
    spies.info.should.have.been.calledWith 'Foo'

  describe 'Local Logging', ->

    it 'should log info', ->
      Logger.info 'Foo'
      spies.info.should.have.been.calledWith 'Foo'

    it 'should log debug', ->
      Logger.debug 'Foo'
      spies.debug.should.have.been.calledWith 'Foo'

    it 'should log warn', ->
      Logger.warn 'Foo'
      spies.warn.should.have.been.calledWith 'Foo'

    it 'should log error', ->
      Logger.error 'Foo'
      spies.error.should.have.been.calledWith 'Foo'

    it 'should log tags', ->
      ['info', 'warn', 'error', 'debug'].forEach (method) ->
        Logger[method]('Foo', ['bar', 'baz'])
        spies[method].should.have.been.calledWith '[BAR BAZ]', 'Foo'

describe 'logger', ->

  it 'should exist as a function', ->
    logger.should.be.defined
    logger.should.be.a 'function'

  it 'should return a logger object', ->
    log = logger()
    log.should.be.an 'object'

  it 'should have all methods', ->
    log = logger()

    'info debug error warn'.split(' ').forEach (method) ->
      log[method].should.be.a 'function'
