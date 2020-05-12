import {polarisGraphQLLogger} from "../utils/logger";
import {ExpressContext, RealitiesHolder} from "@enigmatis/polaris-core";
import {TestContext} from "../context/test-context";
import {TestClassInContext} from "../context/test-class-in-context";
import * as customContextFields from "../constants/custom-context-fields.json";

export const options = {
    typeDefs: [], // BY ANNOTATION
    resolvers: [], // BY ANNOTATION
    port: 8080, //DEFAULT IN SEED
    logger: polarisGraphQLLogger,
    supportedRealities: new RealitiesHolder(
        new Map([[3, { id: 3, type: "notreal3", name: "three" }]])
    ),
    customContext: (context: ExpressContext): Partial<TestContext> => {
        const { req, connection } = context;
        const headers = req ? req.headers : connection?.context;

        return {
            customField: customContextFields.customField,
            instanceInContext: new TestClassInContext(
                customContextFields.instanceInContext.someProperty
            ),
            requestHeaders: {
                customHeader: headers["custom-header"],
            },
        };
    },
};