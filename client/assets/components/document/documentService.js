(function () {
  angular.module('lucidworksView.components.document')
    .factory('DocumentService', documentService);

  function documentService(DocumentConfig, _){
    'ngInject';

    /**
     * [getTemplateId Returns a template-id that's appropriate for the supplied Solr document as configured in DocumentConfig]
     * @param  {object} doc [Solr document]
     * @return {string}     [Template Id]
     */
    function getTemplateId(doc){
      var templateId = _.reduce(DocumentConfig, function(result, item){
        var predicate = item[0];
        var templateId = item[1];
        if(!result){
          if(_.isString(predicate) && !_.isFunction(predicate)){
            var fNv = splitFieldAndValue(predicate);
            if(doc[fNv.field] === fNv.value){
              return templateId;
            }
          }
          else if(_.isFunction(predicate)){
            if(predicate(doc)){
              return templateId;
            }
          }
        }
        else{
          return result;
        }
      }, null);
      return templateId?templateId:'document_default';
    }

    /**
     * [splitFieldAndValue Splits field-name=>value to field-name and value]
     * @param  {string} string [The string to split]
     * @return {object}        [{field: field-name, value: value}]
     */
    function splitFieldAndValue(string){
      return {
        field: string.split('=>')[0],
        value: string.split('=>')[1]
      };
    }

    return {
      getTemplateId: getTemplateId
    };
  }
})();