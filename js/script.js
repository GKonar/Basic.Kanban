$(function() {
    
    //Obiekt Tablicy
    var board = {
        name: 'Kanban Board',
        //Metoda , której będziemy używali do tworzenia nowej kolumny
        addColumn: function(column) {
          this.$element.append(column.$element);
          initSortable();
        },
        $element: $('#board .column-container')
        //Przycisk służący do tworzenia nowych kolumn
        
    };

    $('.create-column')
          .click(function(){
          var name = prompt('Enter a column name');
          var column = new Column(name);
              board.addColumn(column);
          });

    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
    }

    // Funkcja odpowiedzialna za tworzenie randomowego id.
    function randomString() {   
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
    }

    function Column(name) {
    var self = this; // Potrzebne żeby nie zgubić kontekstu.

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

      // Funkcja , która tworzy kolumnę.
      function createColumn() {                     
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

      // Kasowanie kolumny po kliknięciu na przycisk.
        $columnDelete.click(function() {
          self.removeColumn();
        });
      // Dodaje nową kartkę po kliknięciu na przycisk.
          $columnAddCard.click(function() {
            self.addCard(new Card(prompt("Enter the name of the card")));
        });
      
      // Tworzy kolumnę.

        $column.append($columnTitle)
          .append($columnDelete)
          .append($columnAddCard)
          .append($columnCardList);
        
      // Zwraca utworzoną kolumnę.
        return $column;
      }
      
      }// Koniec funkcji Column--------.

      // Dodaje kolejne karty.
      Column.prototype = {
            addCard: function(card) {
            this.$element.children('ul').append(card.$element);
          },
      // Usuwa kolumnę.
            removeColumn: function() {
            this.$element.remove();
          }
      };


    // Funkcja konstruująca klasę Card.
    function Card(description) {
      var self = this;

      this.id = randomString();
      this.description = description;
      this.$element = createCard();

    // Funkcja tworzy kolejną kartkę.
      function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');
        
        //Usunięcie karty.
        $cardDelete.click(function(){
                self.removeCard();
        });

        //Tworzy kartę.

        $card.append($cardDelete)
                .append($cardDescription);

        //Zwraca utworzoną kartę.     
          
            return $card;
      }

    }// Koniec funkcji Card-------.

      Card.prototype = {
          removeCard: function() {
            this.$element.remove();
          }
        }

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);



})

