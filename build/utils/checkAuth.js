'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const constants_1 = __importDefault(require('./constants'));
const checkAuth = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      // Check if the JWT token exists in the request header
      const token =
        (_a = req.headers.authorization) === null || _a === void 0
          ? void 0
          : _a.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token provided');
      }

      // Decode the JWT token
      const decodedToken = jsonwebtoken_1.default.verify(
        token,
        constants_1.default.JWT_SECRET_KEY,
      );

      next();
      // Retrieve the user session from the database
      //     UserSession.findById(decoded.sessionId, (err, session) => {
      //       if (err || !session) {
      //         return res.status(401).json({message: 'Invalid session'});
      //       }
      //       // Store the session data in the request object for further use
      //       req.session = session;
      //       // Proceed to the next middleware
      //       next();
      //     });
      //   },
      // );
    } catch (error) {
      return res
        .status(401)
        .json({success: false, data: {message: error.message}});
    }
  });
exports.default = checkAuth;
