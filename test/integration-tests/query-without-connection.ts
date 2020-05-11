
import * as argsQuery from './jsonRequestsAndHeaders/queryWithArgs.json';
import * as simpleQuery from './jsonRequestsAndHeaders/simpleQuery.json';
import {graphQLRequest} from "../test-server/utils/graphql-client";
import {startTestServer, stopTestServer} from "../test-server/test-server";


beforeEach(async () => {
    await startTestServer();
});

afterEach(async () => {
    return stopTestServer();
});

describe('simple queries without connection', () => {
    it('all entities query', async () => {
        const result = await graphQLRequest(simpleQuery.request, simpleQuery.headers);
        expect(result.allBooks[0].title).toEqual('Book1');
        expect(result.allBooks[1].title).toEqual('Book2');
    });

    it('query with arguments', async () => {
        const result = await graphQLRequest(argsQuery.request, argsQuery.headers);
        expect(result.bookByTitle[0].title).toEqual('Book3');
    });
});
