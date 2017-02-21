import Bluebird from 'bluebird';
import agent from 'superagent';
import promisifyRequest from 'superagent-promise';

export default promisifyRequest(agent, Bluebird);
