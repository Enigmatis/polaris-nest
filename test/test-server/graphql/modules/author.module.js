"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var lib_1 = require("../../../../../src/lib");
var author_1 = require("../entities/author");
var author_resolver_1 = require("../resolvers/author.resolver");
var author_service_1 = require("../services/author.service");
var AuthorModule = /** @class */ (function () {
  function AuthorModule() {}
  AuthorModule = __decorate(
    [
      common_1.Module({
        imports: [lib_1.TypeOrmModule.forFeature([author_1.Author])],
        providers: [
          author_resolver_1.AuthorResolver,
          author_service_1.AuthorService,
        ],
      }),
    ],
    AuthorModule
  );
  return AuthorModule;
})();
exports.AuthorModule = AuthorModule;
