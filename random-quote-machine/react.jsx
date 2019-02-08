

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];



class AppWrapper extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      currentData:'',
      color:''
    }
   this.getRandomQuote=this.getRandomQuote.bind(this);
      this.get=this.get.bind(this);
      this.getQuote=this.getQuote.bind(this);

  }


get(){
        $.ajax({
            type:'get',
                url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            success:function(res){
              localStorage.setItem("temp2", res)
            }
        })
    }

getRandomQuote() {
  return this.props.quotesData.quotes[Math.floor(Math.random() * this.props.quotesData.quotes.length)];
}

getQuote(){

    this.get();
  this.props.quotesData=JSON.parse(localStorage.getItem("temp2"));

  this.setState({
      currentData: this.getRandomQuote(),
      color:colors[Math.floor(Math.random() * colors.length)]
    })


   $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.currentData.quote + '" ' + this.state.currentData.author));

    $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(this.state.currentData.author)+'&content=' + encodeURIComponent(this.state.currentData.quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');

  $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
    }
  );




}
componentWillMount(){
  this.getQuote();
}


  render() {
     $("body").css("background-color",this.state.color);
    return (
      <div id = 'wrapper' style={{backgroundColor: this.props.color,color:this.props.color}}>
        <div id = "quote-box" >
        <QuoteText text={this.state.currentData.quote} color={this.state.color}/ >
        <QuoteAuthor author={this.state.currentData.author}
          color={this.state.color}/ >
        <Buttons getQuote={this.getQuote} color={this.state.color}/ >
        </div>
      <Footer / >
      </div>
    );
  }
};


class QuoteText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div class = 'quote-text' >
        <i class = "fa fa-quote-left"
          style={{color: this.props.color}}> {this.props.text}</i>
        <span id = "text" > < /span>
      </div>
    );
  }
};

class QuoteAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div class = "quote-author"
        style={{color: this.props.color}}>
        - < span id = "author" >{this.props.author} < /span>
      < /div >
    );
  }
};


class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div class = 'buttons' >
      <a id = 'tweet-quote'
        herf = "twitter.com/intent/tweet"
        title = 'Tweet this quote!'
        class = 'button'
        target = '_blank'
        style={{backgroundColor: this.props.color}}>
      <i class = "fa fa-twitter" > < /i>
      < /a >
      <a id = 'tumblr-quote'
      herf = "twitter.com/intent/tweet"
      title = 'Post this quote on tumblr!'
      class = 'button'
      target = '_blank'
        style={{backgroundColor: this.props.color}}>
      <i class = "fa fa-tumblr" > < /i>
      < /a >
      <button class = 'button'
      id = 'new-quote'
       onClick={this.props.getQuote}
        style={{backgroundColor: this.props.color}}
        > New quote< /button>
      < /div >
    );
  }
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div class = 'footer' > by EricZzz < /div>
    );
  }
};



ReactDOM.render( < AppWrapper / > , document.getElementById("app"));