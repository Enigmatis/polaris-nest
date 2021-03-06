import { startTestServer, stopTestServer } from "../test-server/test-server";
import { graphQLRequest } from "../test-server/utils/graphql-client";
import * as deleteAuthor from "./jsonRequestsAndHeaders/deleteAuthor.json";
import * as deleteBook from "./jsonRequestsAndHeaders/deleteBook.json";
import * as authorsByName from "./jsonRequestsAndHeaders/queryAuthorsByName.json";
import * as bookByTitle from "./jsonRequestsAndHeaders/queryBooksByTitle.json";

beforeEach(async () => {
  await startTestServer();
});

afterEach(async () => {
  await stopTestServer();
});

describe("soft delete tests", () => {
  it("should filter deleted entities", async () => {
    const bookDeletionCriteria = {
      title: "4",
    };
    const bookToDelete = await graphQLRequest(
      bookByTitle.request,
      bookByTitle.headers,
      bookDeletionCriteria
    );
    await graphQLRequest(deleteBook.request, deleteBook.headers, {
      id: bookToDelete.bookByTitle[0].id,
    });
    const afterBookDeletionResponse = await graphQLRequest(
      bookByTitle.request,
      bookByTitle.headers,
      bookDeletionCriteria
    );
    expect(afterBookDeletionResponse.bookByTitle.length).toBe(0);
  });

  it("should delete linked entities to deleted entities", async () => {
    const authorDeletionCriteria = {
      name: "1",
    };

    const bookDeletionCriteria = {
      title: "1",
    };

    const authorToDelete = await graphQLRequest(
      authorsByName.request,
      authorsByName.headers,
      authorDeletionCriteria
    );
    await graphQLRequest(deleteAuthor.request, deleteAuthor.headers, {
      id: authorToDelete.authorsByName[0].id,
    });
    const afterBookDeletionResponse = await graphQLRequest(
      bookByTitle.request,
      bookByTitle.headers,
      bookDeletionCriteria
    );
    expect(afterBookDeletionResponse.bookByTitle.length).toBe(0);
  });
});
