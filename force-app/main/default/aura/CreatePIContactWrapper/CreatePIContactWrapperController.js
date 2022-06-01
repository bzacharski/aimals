({
    doInit: function(cmp){
        const recordTypeId = cmp.get('v.pageReference').state.recordTypeId;
        cmp.set('v.recordTypeId', recordTypeId);
    }
});