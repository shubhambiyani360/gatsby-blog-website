"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeParentNodeName = exports.getEndpoints = exports.getContentTypeSchema = exports.buildNodesToRemoveMap = exports.buildMapFromData = exports.buildMapFromNodes = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

const buildMapFromNodes = nodes => {
  return nodes.reduce((acc, current) => {
    const {
      internal,
      strapi_id,
      id
    } = current;
    const type = internal === null || internal === void 0 ? void 0 : internal.type; // We only delete the parent nodes

    if (type.includes('STRAPI__COMPONENT_')) {
      return acc;
    }

    if (type.includes('_JSONNODE')) {
      return acc;
    }

    if (type.includes('_TEXTNODE')) {
      return acc;
    }

    if (type && id && strapi_id) {
      if (acc[type]) {
        acc[type] = [...acc[type], {
          strapi_id,
          id
        }];
      } else {
        acc[type] = [{
          strapi_id,
          id
        }];
      }
    }

    return acc;
  }, {});
};

exports.buildMapFromNodes = buildMapFromNodes;

const buildMapFromData = (endpoints, data) => {
  const map = {};

  for (let i = 0; i < endpoints.length; i++) {
    const {
      singularName
    } = endpoints[i];

    const nodeType = _lodash.default.toUpper(`Strapi_${_lodash.default.snakeCase(singularName)}`);

    for (let entity of data[i]) {
      if (map[nodeType]) {
        map[nodeType] = [...map[nodeType], {
          strapi_id: entity.id
        }];
      } else {
        map[nodeType] = [{
          strapi_id: entity.id
        }];
      }
    }
  }

  return map;
};

exports.buildMapFromData = buildMapFromData;

const buildNodesToRemoveMap = (existingNodesMap, endpoints, data) => {
  const newNodes = buildMapFromData(endpoints, data);
  const toRemoveMap = Object.entries(existingNodesMap).reduce((acc, [name, value]) => {
    const currentNodes = newNodes[name]; // Since we create nodes for relations when fetching the api
    // We only to delete nodes that are actually being fetched

    if (!currentNodes) {
      return acc;
    }

    acc[name] = value.filter(j => {
      return currentNodes.findIndex(k => k.strapi_id === j.strapi_id) === -1;
    });
    return acc;
  }, {});
  return toRemoveMap;
};

exports.buildNodesToRemoveMap = buildNodesToRemoveMap;

const getContentTypeSchema = (schemas, ctUID) => {
  const currentContentTypeSchema = schemas.find(({
    uid
  }) => uid === ctUID);
  return currentContentTypeSchema;
};

exports.getContentTypeSchema = getContentTypeSchema;

const getEndpoints = ({
  collectionTypes,
  singleTypes
}, schemas) => {
  const types = normalizeConfig({
    collectionTypes,
    singleTypes
  });
  const endpoints = schemas.filter(({
    schema
  }) => types.findIndex(({
    singularName
  }) => singularName === schema.singularName) !== -1).map(({
    schema: {
      kind,
      singularName,
      pluralName
    },
    uid
  }) => {
    const options = types.find(config => config.singularName === singularName);
    const {
      queryParams,
      queryLimit,
      pluginOptions
    } = options;

    if (kind === 'singleType') {
      return {
        singularName,
        kind,
        uid,
        endpoint: `/api/${singularName}`,
        queryParams: queryParams || {
          populate: '*'
        },
        pluginOptions
      };
    }

    return {
      singularName,
      pluralName,
      kind,
      uid,
      endpoint: `/api/${pluralName}`,
      queryParams: { ...(queryParams || {}),
        pagination: {
          pageSize: queryLimit || 250,
          page: 1
        },
        populate: (queryParams === null || queryParams === void 0 ? void 0 : queryParams.populate) || '*'
      },
      pluginOptions
    };
  });
  return endpoints;
};

exports.getEndpoints = getEndpoints;

const normalizeConfig = ({
  collectionTypes,
  singleTypes
}) => {
  const toSchemaDef = types => types.map(config => {
    if (_lodash.default.isPlainObject(config)) {
      return config;
    }

    return {
      singularName: config
    };
  }).filter(Boolean);

  const normalizedCollectionTypes = toSchemaDef(collectionTypes);
  const normalizedSingleTypes = toSchemaDef(singleTypes);
  return [...(normalizedCollectionTypes || []), ...(normalizedSingleTypes || [])];
};

const makeParentNodeName = (schemas, uid) => {
  const schema = getContentTypeSchema(schemas, uid);
  const {
    schema: {
      singularName,
      kind
    }
  } = schema;
  let nodeName = `Strapi_${_lodash.default.snakeCase(singularName)}`;
  const isComponentType = !['collectionType', 'singleType'].includes(kind);

  if (isComponentType) {
    nodeName = `Strapi__Component_${_lodash.default.snakeCase(_lodash.default.replace(uid, '.', '_'))}`;
  }

  return _lodash.default.toUpper(nodeName);
};

exports.makeParentNodeName = makeParentNodeName;