<script type="text/javascript">

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');
  alert(333);
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}
export default{
 getQueryParams
}
</script>