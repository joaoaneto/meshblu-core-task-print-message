/* eslint-disable no-console */
import MessengerManagerFactory from 'meshblu-core-manager-messenger/factory';
import http from 'http';

class PrintMessage {
  constructor(uuidAliasResolver) {
    this.uuidAliasResolver = uuidAliasResolver;

    this.messengerManagerFactory = new MessengerManagerFactory(
      uuidAliasResolver,
      process.env.NAMESPACE || 'meshblu',
      process.env.REDIS_URI,
    );

    this.messenger = this.messengerManagerFactory.build();
  }

  do(request, callback) {
    this.messenger.on('message', (channel, message) => {
      console.log(`--- message received: ${message}`);
    });

    const response = {
      metadata: {
        responseId: request.metadata.responseId,
        code: 204,
        status: http.STATUS_CODE[204],
      },
    };

    callback(null, response);
  }
}

export default PrintMessage;
