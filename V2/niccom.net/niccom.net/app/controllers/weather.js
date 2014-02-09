angular.module('app')
    .controller('WeatherCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

        //$http.get("http://api.openweathermap.org/data/2.5/weather?id=3204541&units=metric")

        loadWeatherData(100 * 60 * 5);

        function loadWeatherData(autoRefreshPeriod) {

            $http.get("proxy/weather")
                .success(function (data) {
                    $scope.current = data;
                });
            if (autoRefreshPeriod && autoRefreshPeriod > (100*60)) {
                $timeout(function () { loadWeatherData(autoRefreshPeriod); }, autoRefreshPeriod);
            }
        }
    }]);


/*
json sample
{
synop_id: "14542922014000",
br_stanice: "14542",
naziv_stanice: "Бања Лука",
termin: "09.02.2014 1:00",
temperatura: 6.7,
pritisak: "989,3 mBar",
brzina_vjetra: "0 m/s",
smjer_vjetra: "C",
vidljivost: "10,0km",
oblacnost: "7",
slika: "ikone/bez_pojava/noc/33.png",
bb_termin: "8.2.2014 20:56",
bb_temperatura: "10,5",
bb_vidljivost: "5",
bb_pojave: "ikone/bez_pojava/noc/33.png"
}
*/