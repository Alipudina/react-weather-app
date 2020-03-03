getUserLocation= async () => {
  let url= await fetch('http://ip-api.com/json/');
  let data= await url.json();
  console.log(data);
}


componentDidMount() {
  this.getUserLocation();
}
