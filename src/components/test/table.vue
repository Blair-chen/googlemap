<template lang="pug">
  div
    span(style="font-size:15px;margin:10px;text-align=center") {{center1}}
    Table(:columns="columns1" :data="data1")
</template>
<script>
export default {
  data(){
    return {
      center1:"中国 以{lat: 39.9042, lng:116 }为中心点",
      center2:"澳大利亚 以{lat: -33.88658145569154, lng: 151.13988831025813}为中心点",
      columns1:[
        {key:"id", width: 100,title:"id"},
        {key:"functionClassZero", width: 100,title:"functionClassZero"},
        {key:"functionClassOne", width: 100,title:"functionClassOne"},
        {key:"functionClassTwo", width: 100,title:"functionClassTwo"},
        {key:"functionClassThree", width: 100,title:"functionClassThree"},
        {key:"functionClassFour", width: 100,title:"functionClassFour"},
        {key:"bound",title:"bound"}
      ],
      data2:[
{"id":1,"functionClassZero":4769940,"functionClassTwo":505359,"bound":{"northeast":{"lat":87.06897386178504,"lng":180.0},"sourthwest":{"lat":-89.16722422740155,"lng":-180.0},"zoom":0},"functionClassFour":161576,"functionClassThree":233010,"functionClassOne":569236},
{"id":2,"functionClassZero":4769940,"functionClassTwo":505359,"bound":{"northeast":{"lat":65.2844800898337,"lng":180.0},"sourthwest":{"lat":-82.87738104906909,"lng":-180.0},"zoom":0},"functionClassFour":161576,"functionClassThree":233010,"functionClassOne":569236},
{"id":3,"functionClassZero":4769940,"functionClassTwo":505359,"bound":{"northeast":{"lat":24.668337673370836,"lng":-77.02518270033147},"sourthwest":{"lat":-69.35584719881938,"lng":19.30495932084773},"zoom":0},"functionClassFour":161576,"functionClassThree":233010,"functionClassOne":569236},
{"id":4,"functionClassZero":4769940,"functionClassTwo":505359,"bound":{"northeast":{"lat":-5.285901974448918,"lng":-142.94264719503667},"sourthwest":{"lat":-55.38988374805234,"lng":85.22242381555293},"zoom":0},"functionClassFour":161576,"functionClassThree":233010,"functionClassOne":569236},
{"id":5,"functionClassZero":3999480,"functionClassTwo":450045,"bound":{"northeast":{"lat":-20.239474208353144,"lng":-175.90137944238927},"sourthwest":{"lat":-45.65820223325211,"lng":118.18115606290553},"zoom":0},"functionClassFour":135834,"functionClassThree":201839,"functionClassOne":495876},
{"id":6,"functionClassZero":2907408,"functionClassTwo":344089,"bound":{"northeast":{"lat":-27.272050917899094,"lng":167.61925443393443},"sourthwest":{"lat":-40.025602368304334,"lng":134.66052218658183},"zoom":1},"functionClassFour":76678,"functionClassThree":144729,"functionClassOne":376104},
{"id":7,"functionClassZero":1103090,"functionClassTwo":116217,"bound":{"northeast":{"lat":-30.635814774913385,"lng":159.37957137209628},"sourthwest":{"lat":-37.01805083265383,"lng":142.90020524841998},"zoom":1},"functionClassFour":32290,"functionClassThree":57274,"functionClassOne":159065},
{"id":8,"functionClassZero":698306,"functionClassTwo":76207,"bound":{"northeast":{"lat":-32.27575688067395,"lng":155.2597298411772},"sourthwest":{"lat":-35.46755538247911,"lng":147.02004677933905},"zoom":1},"functionClassFour":17659,"functionClassThree":30266,"functionClassOne":115489},
{"id":9,"functionClassZero":434800,"functionClassTwo":45794,"bound":{"northeast":{"lat":-33.084857179175614,"lng":153.19980907571767},"sourthwest":{"lat":-34.680841423777586,"lng":149.0799675447986},"zoom":1},"functionClassFour":9450,"functionClassThree":16037,"functionClassOne":76355},
{"id":10,"functionClassZero":325733,"functionClassTwo":34702,"bound":{"northeast":{"lat":-33.48664699344752,"lng":152.1698486929879},"sourthwest":{"lat":-34.28464973791058,"lng":150.10992792752836},"zoom":1},"functionClassFour":6784,"functionClassThree":10449,"functionClassOne":57854},
{"id":11,"functionClassZero":276845,"functionClassTwo":29304,"bound":{"northeast":{"lat":-33.68684683000326,"lng":151.654868501623},"sourthwest":{"lat":-34.08584952994093,"lng":150.62490811889325},"zoom":1},"functionClassFour":5047,"functionClassThree":8443,"functionClassOne":51117},
{"id":12,"functionClassZero":138078,"functionClassTwo":17093,"bound":{"northeast":{"lat":-33.7867723785956,"lng":151.39737840594057},"sourthwest":{"lat":-33.986273894525695,"lng":150.8823982145757},"zoom":0},"functionClassFour":2511,"functionClassThree":5299,"functionClassOne":30544},
{"id":13,"functionClassZero":58748,"functionClassTwo":8219,"bound":{"northeast":{"lat":-33.83669148654118,"lng":151.26863335809935},"sourthwest":{"lat":-33.93644226525132,"lng":151.0111432624169},"zoom":2},"functionClassFour":1055,"functionClassThree":2233,"functionClassOne":12949},
{"id":14,"functionClassZero":19423,"functionClassTwo":3382,"bound":{"northeast":{"lat":-33.86164011476782,"lng":151.20426083417874},"sourthwest":{"lat":-33.91151550671602,"lng":151.07551578633752},"zoom":2},"functionClassFour":409,"functionClassThree":847,"functionClassOne":3632},
{"id":15,"functionClassZero":4769,"functionClassTwo":949,"bound":{"northeast":{"lat":-33.87411169630496,"lng":151.17207457221843},"sourthwest":{"lat":-33.89904939260321,"lng":151.10770204829782},"zoom":2},"functionClassFour":81,"functionClassThree":292,"functionClassOne":965},
{"id":16,"functionClassZero":1052,"functionClassTwo":214,"bound":{"northeast":{"lat":-33.88034680378735,"lng":151.15598144123828},"sourthwest":{"lat":-33.89281565197699,"lng":151.12379517927798},"zoom":3},"functionClassFour":0,"functionClassThree":155,"functionClassOne":143},
{"id":17,"functionClassZero":190,"functionClassTwo":82,"bound":{"northeast":{"lat":-33.88346418668925,"lng":151.1479348757482},"sourthwest":{"lat":-33.88969861078913,"lng":151.13184174476805},"zoom":3},"functionClassFour":0,"functionClassThree":74,"functionClassOne":8},
{"id":18,"functionClassZero":72,"functionClassTwo":0,"bound":{"northeast":{"lat":-33.88502283542816,"lng":151.14391159300317},"sourthwest":{"lat":-33.888140047478736,"lng":151.1358650275131},"zoom":3},"functionClassFour":0,"functionClassThree":46,"functionClassOne":0},
{"id":19,"functionClassZero":14,"functionClassTwo":0,"bound":{"northeast":{"lat":-33.885802149119336,"lng":151.14189995163065},"sourthwest":{"lat":-33.8873607551447,"lng":151.1378766688856},"zoom":3},"functionClassFour":0,"functionClassThree":24,"functionClassOne":0},
{"id":20,"functionClassZero":4,"functionClassTwo":0,"bound":{"northeast":{"lat":-33.88619180329531,"lng":151.1408941309444},"sourthwest":{"lat":-33.886971106308,"lng":151.13888248957187},"zoom":4},"functionClassFour":0,"functionClassThree":7,"functionClassOne":0},
{"id":21,"functionClassZero":2,"functionClassTwo":0,"bound":{"northeast":{"lat":-33.88638662971589,"lng":151.14039122060126},"sourthwest":{"lat":-33.88677628122225,"lng":151.139385399915},"zoom":4},"functionClassFour":0,"functionClassThree":4,"functionClassOne":0},
{"id":22,"functionClassZero":0,"functionClassTwo":0,"bound":{"northeast":{"lat":-33.88648404275933,"lng":151.1401397654297},"sourthwest":{"lat":-33.886678868512504,"lng":151.13963685508656},"zoom":4},"functionClassFour":0,"functionClassThree":2,"functionClassOne":0},
{"id":23,"functionClassZero":0,"functionClassTwo":0,"bound":{"northeast":{"lat":-33.88648404275933,"lng":151.1401397654297},"sourthwest":{"lat":-33.886678868512504,"lng":151.13963685508656},"zoom":4},"functionClassFour":0,"functionClassThree":2,"functionClassOne":0},
],
      data1:[
        {"id":1,"functionClassZero":36666101,"functionClassTwo":2318151,"bound":{"northeast":{"lat":89.26980475387418,"lng":180.0},"sourthwest":{"lat":-86.65741803715457,"lng":-180.0},"zoom":0},"functionClassFour":409507,"functionClassThree":1325364,"functionClassOne":2034107},
{"id":2,"functionClassZero":36666101,"functionClassTwo":2318151,"bound":{"northeast":{"lat":83.75290492502874,"lng":180.0},"sourthwest":{"lat":-61.94139151726107,"lng":-180.0},"zoom":0},"functionClassFour":409507,"functionClassThree":1325364,"functionClassOne":2034107},
{"id":3,"functionClassZero":36666101,"functionClassTwo":2318151,"bound":{"northeast":{"lat":71.85366552428678,"lng":-112.1650710105896},"sourthwest":{"lat":-17.649933455943465,"lng":-15.8349289894104},"zoom":0},"functionClassFour":409507,"functionClassThree":1325364,"functionClassOne":2034107},
{"id":4,"functionClassZero":36666101,"functionClassTwo":2318151,"bound":{"northeast":{"lat":59.441148188070194,"lng":-178.0825355052948},"sourthwest":{"lat":12.719538775073572,"lng":50.0825355052948},"zoom":0},"functionClassFour":409507,"functionClassThree":1325364,"functionClassOne":2034107},
{"id":5,"functionClassZero":29403584,"functionClassTwo":1778927,"bound":{"northeast":{"lat":50.6760631796257,"lng":148.9587322473526},"sourthwest":{"lat":27.13117104019742,"lng":83.0412677526474},"zoom":0},"functionClassFour":308658,"functionClassThree":986041,"functionClassOne":1595390},
{"id":6,"functionClassZero":15574543,"functionClassTwo":861758,"bound":{"northeast":{"lat":45.54738237639752,"lng":132.4793661236763},"sourthwest":{"lat":33.75498702536562,"lng":99.5206338763237},"zoom":1},"functionClassFour":132151,"functionClassThree":541105,"functionClassOne":735194},
{"id":7,"functionClassZero":6850113,"functionClassTwo":382256,"bound":{"northeast":{"lat":42.790058043091946,"lng":124.23968306183815},"sourthwest":{"lat":36.89147322096338,"lng":107.76031693816185},"zoom":1},"functionClassFour":65168,"functionClassThree":270303,"functionClassOne":362014},
{"id":8,"functionClassZero":2295069,"functionClassTwo":156379,"bound":{"northeast":{"lat":41.363123799235055,"lng":120.11984153091908},"sourthwest":{"lat":38.41353641219232,"lng":111.88015846908092},"zoom":1},"functionClassFour":29516,"functionClassThree":109955,"functionClassOne":160925},
{"id":9,"functionClassZero":1115654,"functionClassTwo":69574,"bound":{"northeast":{"lat":40.63764704876223,"lng":118.05992076545954},"sourthwest":{"lat":39.16281659073737,"lng":113.94007923454046},"zoom":1},"functionClassFour":14405,"functionClassThree":54998,"functionClassOne":92739},
{"id":10,"functionClassZero":607057,"functionClassTwo":40073,"bound":{"northeast":{"lat":40.27191782137093,"lng":117.02996038272977},"sourthwest":{"lat":39.534498000160255,"lng":114.97003961727023},"zoom":1},"functionClassFour":7008,"functionClassThree":24844,"functionClassOne":68251},
{"id":11,"functionClassZero":288960,"functionClassTwo":24679,"bound":{"northeast":{"lat":40.088307217193055,"lng":116.51498019136488},"sourthwest":{"lat":39.71959673266812,"lng":115.48501980863512},"zoom":1},"functionClassFour":2557,"functionClassThree":12646,"functionClassOne":38554},
{"id":12,"functionClassZero":40122,"functionClassTwo":1896,"bound":{"northeast":{"lat":39.99631565055968,"lng":116.25749009568244},"sourthwest":{"lat":39.811960336560524,"lng":115.74250990431756},"zoom":1},"functionClassFour":732,"functionClassThree":1899,"functionClassOne":4386},
{"id":13,"functionClassZero":6831,"functionClassTwo":45,"bound":{"northeast":{"lat":39.950273331362524,"lng":116.12874504784122},"sourthwest":{"lat":39.85809566539597,"lng":115.87125495215878},"zoom":2},"functionClassFour":100,"functionClassThree":604,"functionClassOne":400},
{"id":14,"functionClassZero":719,"functionClassTwo":0,"bound":{"northeast":{"lat":39.92724054164621,"lng":116.06437252392061},"sourthwest":{"lat":39.88115170754208,"lng":115.93562747607939},"zoom":2},"functionClassFour":0,"functionClassThree":12,"functionClassOne":0},
{"id":15,"functionClassZero":220,"functionClassTwo":0,"bound":{"northeast":{"lat":39.9157212397446,"lng":116.0321862619603},"sourthwest":{"lat":39.89267682255242,"lng":115.9678137380397},"zoom":2},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":16,"functionClassZero":90,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90996086209393,"lng":116.01609313098015},"sourthwest":{"lat":39.89843865348032,"lng":115.98390686901985},"zoom":3},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":17,"functionClassZero":32,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90708049160128,"lng":116.00804656549008},"sourthwest":{"lat":39.90131938729228,"lng":115.99195343450992},"zoom":3},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":18,"functionClassZero":18,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90564026093909,"lng":116.00402328274504},"sourthwest":{"lat":39.90275970878432,"lng":115.99597671725496},"zoom":3},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":19,"functionClassZero":4,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90492013425414,"lng":116.00201164137252},"sourthwest":{"lat":39.90347985817673,"lng":115.99798835862748},"zoom":3},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":20,"functionClassZero":0,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90456006807324,"lng":116.00100582068626},"sourthwest":{"lat":39.90383993003452,"lng":115.99899417931374},"zoom":4},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":21,"functionClassZero":0,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90438003427315,"lng":116.00050291034313},"sourthwest":{"lat":39.904019965253795,"lng":115.99949708965687},"zoom":4},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":22,"functionClassZero":0,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90429001719571,"lng":116.00025145517156},"sourthwest":{"lat":39.90410998268606,"lng":115.99974854482844},"zoom":4},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0},
{"id":23,"functionClassZero":0,"functionClassTwo":0,"bound":{"northeast":{"lat":39.90429001719571,"lng":116.00025145517156},"sourthwest":{"lat":39.90410998268606,"lng":115.99974854482844},"zoom":4},"functionClassFour":0,"functionClassThree":0,"functionClassOne":0}
      ]
    }
  }
}
</script>
