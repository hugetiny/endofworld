function getEarth(dataType) {

    let data = []
    axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${dataType}_global.csv`
        // url: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${dataType}.csv`
    })
        .then(function (response) {
            console.log(response.data.split('\n'))
            response.data.split('\n').forEach(raw => {
                if (raw.indexOf('"') !== -1) {
                    raw = raw.split('"')[2]
                }
                raw = raw.split(',')
                data.push([parseFloat(raw[3]), parseFloat(raw[2]), parseFloat(raw[raw.length - 1])])

            })
            data.shift()
            console.log(data)
            let EC = echarts.init(document.querySelector('.EC'))
            let canvas = document.createElement('canvas');

            // let mapChart = echarts.init(canvas, null, {
            //     width: 1096,
            //     height: 160
            // });

            // mapChart.setOption({
            //     series: [{
            //         type: 'map',
            //         map: 'world',
            //         // full screen canvas
            //         top: 0,
            //         left: 0,
            //         right: 0,
            //         bottom: 0,
            //         boundingCoords: [
            //             [-180, 90],
            //             [180, -90]
            //         ]
            //     }]
            // });
            let colorType
            switch (dataType) {
                case 'Deaths':
                    colorType = '#999'
                    break;
                case 'Recovered':
                    colorType = 'green'
                    break;
                default:
                    colorType = 'red'
            }
            let option = {
                // TODO category
                visualMap: {
                    show: true,
                    min: 0,
                    max: 2000,
                    inRange: {
                        symbolSize: [1, 50]
                    }
                },
                globe: {
                    baseTexture: "./static/world.jpg",
                    heightTexture: "./static/world.jpg",
                    environment: 'static/starfield.jpg',
                    displacementScale: 0.03,
                    displacementQuality: 'high',
                    // globeRadius: 200,
                    globeOuterRadius: 110,
                    // baseColor: '#ccc',
                    shading: 'color',
                    viewControl: {
                        alpha: 30,
                        beta: 160,
                        // targetCoord: [116.46, 39.92],
                        autoRotate: true,
                        autoRotateAfterStill: 5,
                        distance: 300
                    }
                },
                series: {
                    type: 'scatter3D',
                    coordinateSystem: 'globe',
                    // blendMode: 'lighter',
                    symbolSize: 2,
                    itemStyle: {
                        color: colorType,
                        opacity: 1
                    },
                    data: data,
                    tooltip:{
                        show:false
                    }
                }
            }
            EC.setOption(option)
            EC.on('mousemove', params => {
                console.log(params)
            })
        })
        .catch(function (error) {
            console.log(error);
        });


    //TODO click events
    // mapChart.on('click', params => {
    //     let name = params.name
    //     let mapJson = 'https://raw.githubusercontent.com/Mying666/EC-JSON/gh-pages/json/' + name + '.json'
    //     EC.showLoading()
    //     $.getJSON(mapJson, geoJson => {
    //         // option.title.text = 'return?'
    //         option.series[1].map = name
    //         option.series[1].zlevel = 3
    //         echarts.registerMap(name, geoJson)
    //         // random example
    //         let data = []
    //         geoJson.features.forEach(d => {
    //             data.push({
    //                 name: d.properties.name,
    //                 value: (Math.random() * 3000).toFixed(2)
    //             })
    //         })
    //         option.series[1].data = data
    //         EC.setOption(option)
    //         $('.earthbtn').show()
    //         EC.hideLoading()
    //     })
    // })
    // $('.earthbtn').on('click', () => {
    //     // option.title.text = 'get back to earth'
    //     option.series[1].map = ''
    //     option.series[1].zlevel = 1
    //     EC.setOption(option)
    // })

}
