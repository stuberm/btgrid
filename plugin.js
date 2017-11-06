(function(){
  CKEDITOR.plugins.add('bt4grid', {
      lang: 'en,ru,fr,nl,de',
      requires: 'widget,dialog',
      icons: 'bt4grid',
      init: function(editor) {
       var maxGridColumns = 12;
       var lang = editor.lang.bt4grid;

       CKEDITOR.dialog.add('bt4grid',  this.path + 'dialogs/bt4grid.js');

       editor.addContentsCss( this.path + 'styles/editor.css');
       // Add widget
       editor.ui.addButton('bt4grid', {
         label: lang.createBtGrid,
         command: 'bt4grid',
         icon: this.path + 'icons/bt4grid.png'
       });
       editor.widgets.add('bt4grid',
         {
           allowedContent: 'div(!bt4grid);div(!row,!row-*);div(!col-*-*);div(!content)',
           requiredContent: 'div(bt4grid)',
           parts: {
             bt4grid: 'div.bt4grid',
           },
           editables: {
             content: '',
           },
           template:
                   '<div class="bt4grid">' +
                   '</div>',
           //button: lang.createBtGrid,
           dialog: 'bt4grid',
           defaults: {
            //  colCount: 2,
            // rowCount: 1
          },
          // Before init.
           upcast: function(element) {
             return element.name == 'div' && element.hasClass('bt4grid');
           },
           // initialize
           // Init function is useful after copy paste rebuild.
           init: function() {
             var rowNumber= 1;
             var rowCount = this.element.getChildCount();
             for (rowNumber; rowNumber <= rowCount;rowNumber++) {
               this.createEditable(maxGridColumns, rowNumber);
             }
           },
           // Prepare data
           data: function() {
             if (this.data.colCount && this.element.getChildCount() < 1) {
               var colCount = this.data.colCount;
               var rowCount = this.data.rowCount;
               var row = this.parts['bt4grid'];
               for (var i= 1;i <= rowCount;i++) {
                 this.createGrid(colCount, row, i);
               }
             }
           },
           //Helper functions.
           // Create grid
           createGrid: function(colCount, row, rowNumber) {
             var content = '<div class="row row-' + rowNumber + '">';
             for (var i = 1; i <= colCount; i++) {
               content = content + '<div class="col col-12 col-md-' + maxGridColumns/colCount + '">' +
                                   '  <div class="content">' +
                                   '    <p>Col ' + i + ' content area</p>' +
                                   '  </div>' +
                                   '</div>';
             }
             content =content + '</div>';
             row.appendHtml(content);
             this.createEditable(colCount, rowNumber);
           },
           // Create editable.
           createEditable: function(colCount,rowNumber) {
             for (var i = 1; i <= colCount; i++) {
               this.initEditable( 'content'+ rowNumber + i, {
                  selector: '.row-'+ rowNumber +' > div:nth-child('+ i +') div.content'
                } );
              }
            }
          }
        );
      }
    }
  );

})();
