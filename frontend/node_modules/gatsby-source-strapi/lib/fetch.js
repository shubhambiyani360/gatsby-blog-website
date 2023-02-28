"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchEntities = exports.fetchEntity = exports.fetchStrapiContentTypes = void 0;

var _lodash = require("lodash");

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

var _qs = _interopRequireDefault(require("qs"));

var _cleanData = require("./clean-data");

const fetchStrapiContentTypes = async strapiConfig => {
  const axiosInstance = (0, _axiosInstance.default)(strapiConfig);
  const [{
    data: {
      data: contentTypes
    }
  }, {
    data: {
      data: components
    }
  }] = await Promise.all([axiosInstance.get('/api/content-type-builder/content-types'), axiosInstance.get('/api/content-type-builder/components')]);
  return {
    schemas: [...contentTypes, ...components],
    contentTypes,
    components
  };
};

exports.fetchStrapiContentTypes = fetchStrapiContentTypes;

const fetchEntity = async ({
  endpoint,
  queryParams,
  uid,
  pluginOptions
}, ctx) => {
  const {
    strapiConfig,
    reporter
  } = ctx;
  const axiosInstance = (0, _axiosInstance.default)(strapiConfig);
  const opts = {
    method: 'GET',
    url: endpoint,
    params: queryParams,
    paramsSerializer: params => _qs.default.stringify(params, {
      encodeValuesOnly: true
    })
  };

  try {
    var _pluginOptions$i18n;

    reporter.info(`Starting to fetch data from Strapi - ${opts.url} with ${JSON.stringify(opts)}`); // Handle internationalization

    const locale = pluginOptions === null || pluginOptions === void 0 ? void 0 : (_pluginOptions$i18n = pluginOptions.i18n) === null || _pluginOptions$i18n === void 0 ? void 0 : _pluginOptions$i18n.locale;
    const otherLocales = [];

    if (locale) {
      // Ignore queryParams locale in favor of pluginOptions
      delete queryParams.locale;

      if (locale === 'all') {
        // Get all available locales
        const {
          data: response
        } = await axiosInstance({ ...opts,
          params: {
            populate: {
              localizations: {
                fields: ['locale']
              }
            }
          }
        });
        response.data.attributes.localizations.data.forEach(localization => otherLocales.push(localization.attributes.locale));
      } else {
        // Only one locale
        queryParams.locale = locale;
      }
    } // Fetch default entity based on request options


    const {
      data
    } = await axiosInstance(opts); // Fetch other localizations of this entry if there are any

    const otherLocalizationsPromises = otherLocales.map(async locale => {
      const {
        data: localizationResponse
      } = await axiosInstance({ ...opts,
        params: { ...opts.params,
          locale
        }
      });
      return localizationResponse.data;
    }); // Run queries in parallel

    const otherLocalizationsData = await Promise.all(otherLocalizationsPromises);
    return (0, _lodash.castArray)([data.data, ...otherLocalizationsData]).map(entry => (0, _cleanData.cleanData)(entry, { ...ctx,
      contentTypeUid: uid
    }));
  } catch (error) {
    // reporter.panic(
    //   `Failed to fetch data from Strapi ${opts.url} with ${JSON.stringify(opts)}`,
    //   error,
    // );
    return [];
  }
};

exports.fetchEntity = fetchEntity;

const fetchEntities = async ({
  endpoint,
  queryParams,
  uid,
  pluginOptions
}, ctx) => {
  var _pluginOptions$i18n2;

  const {
    strapiConfig,
    reporter
  } = ctx;
  const axiosInstance = (0, _axiosInstance.default)(strapiConfig);
  const opts = {
    method: 'GET',
    url: endpoint,
    params: queryParams,
    paramsSerializer: params => _qs.default.stringify(params, {
      encodeValuesOnly: true
    })
  }; // Use locale from pluginOptions if it's defined

  if (pluginOptions !== null && pluginOptions !== void 0 && (_pluginOptions$i18n2 = pluginOptions.i18n) !== null && _pluginOptions$i18n2 !== void 0 && _pluginOptions$i18n2.locale) {
    delete queryParams.locale;
    queryParams.locale = pluginOptions.i18n.locale;
  }

  try {
    reporter.info(`Starting to fetch data from Strapi - ${opts.url} with ${JSON.stringify(opts.params)}`);
    const {
      data: response
    } = await axiosInstance(opts);
    const data = (response === null || response === void 0 ? void 0 : response.data) || response;
    const meta = response === null || response === void 0 ? void 0 : response.meta;
    const page = parseInt((meta === null || meta === void 0 ? void 0 : meta.pagination.page) || 1, 10);
    const pageCount = parseInt((meta === null || meta === void 0 ? void 0 : meta.pagination.pageCount) || 1, 10);
    const pagesToGet = Array.from({
      length: pageCount - page
    }).map((_, i) => i + page + 1);
    const fetchPagesPromises = pagesToGet.map(page => {
      return (async () => {
        const options = { ...opts
        };
        options.params.pagination.page = page;
        reporter.info(`Starting to fetch data from Strapi - ${options.url} with ${JSON.stringify(opts.paramsSerializer(opts.params))}`);

        try {
          const {
            data: {
              data
            }
          } = await axiosInstance(options);
          return data;
        } catch (err) {
          reporter.panic(`Failed to fetch data from Strapi ${options.url}`, err);
        }
      })();
    });
    const results = await Promise.all(fetchPagesPromises);
    const cleanedData = [...data, ...(0, _lodash.flattenDeep)(results)].map(entry => (0, _cleanData.cleanData)(entry, { ...ctx,
      contentTypeUid: uid
    }));
    return cleanedData;
  } catch (error) {
    reporter.panic(`Failed to fetch data from Strapi ${opts.url}`, error);
    return [];
  }
};

exports.fetchEntities = fetchEntities;