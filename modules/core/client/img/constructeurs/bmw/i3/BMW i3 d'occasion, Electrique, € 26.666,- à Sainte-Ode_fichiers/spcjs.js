
    if (typeof(OA_zones) != 'undefined') {
        var OA_zoneids = '';
        for (var zonename in OA_zones) OA_zoneids += escape(zonename+'=' + OA_zones[zonename] + "|");
        OA_zoneids += '&amp;nz=1';
    } else {
        var OA_zoneids = escape('418|419|420|421|422|423|424|425|430|431|432|433|434|435|436|437|438|439|440|441|442|443|444|445|446|447|448|449|495|559');
    }

    if (typeof(OA_source) == 'undefined') { OA_source = ''; }
    var OA_p=location.protocol=='https:'?'https://secure.c.autoscout24.com/spc.php':'http://c.autoscout24.com/spc.php';
    var OA_r=Math.floor(Math.random()*99999999);
    OA_output = new Array();

    var OA_spc="<"+"script type='text/javascript' ";
    OA_spc+="src='"+OA_p+"?zones="+OA_zoneids;
    OA_spc+="&amp;source="+escape(OA_source)+"&amp;r="+OA_r;
    OA_spc+="&amp;make=13&amp;model=20319&amp;price=5&amp;fr=11&amp;miles=3&amp;art=6&amp;ad=private&amp;zip=B6681&amp;zip2=6681&amp;did=19542258&amp;seg=med_hp&amp;hp=4&amp;acc=U&amp;vat=0&amp;fuel=E&amp;gear=&amp;carby=0&amp;ECO=YES&amp;equi=125&amp;type=U&amp;hsn=&amp;tsn=&amp;cost=26666&amp;img=http%3A%2F%2Fpic2.autoscout24.net%2Fimages%2F112%2F920%2F0279920112001.jpg&amp;stmak=BMW&amp;stmod=i3&amp;sthp=102&amp;stkw=75&amp;age=24&amp;styea=2013&amp;stmon=11&amp;stmil=25000&amp;stccm=0&amp;eutax=106801&amp;carid=279920112&amp;p=detail&amp;splz=&amp;width=3&amp;test=off&amp;rnd=65";
    OA_spc+=(document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));

    if (window.location) OA_spc+="&amp;loc="+escape(window.location);
    if (document.referrer) OA_spc+="&amp;referer="+escape(document.referrer);
    OA_spc+="'><"+"/script>";
    document.write(OA_spc);

    function OA_show(name) {
        if (typeof(OA_output[name]) == 'undefined') {
            return;
        } else {
            document.write(OA_output[name]);
        }
    }

    function OA_showpop(name) {
        zones = window.OA_zones ? window.OA_zones : false;
        var zoneid = name;
        if (typeof(window.OA_zones) != 'undefined') {
            if (typeof(zones[name]) == 'undefined') {
                return;
            }
            zoneid = zones[name];
        }

        OA_p=location.protocol=='https:'?'https://secure.c.autoscout24.com/apu.php':'http://c.autoscout24.com/apu.php';

        var OA_pop="<"+"script type='text/javascript' ";
        OA_pop+="src='"+OA_p+"?zoneid="+zoneid;
        OA_pop+="&amp;source="+escape(OA_source)+"&amp;r="+OA_r;
        OA_spc+="&amp;make=13&amp;model=20319&amp;price=5&amp;fr=11&amp;miles=3&amp;art=6&amp;ad=private&amp;zip=B6681&amp;zip2=6681&amp;did=19542258&amp;seg=med_hp&amp;hp=4&amp;acc=U&amp;vat=0&amp;fuel=E&amp;gear=&amp;carby=0&amp;ECO=YES&amp;equi=125&amp;type=U&amp;hsn=&amp;tsn=&amp;cost=26666&amp;img=http%3A%2F%2Fpic2.autoscout24.net%2Fimages%2F112%2F920%2F0279920112001.jpg&amp;stmak=BMW&amp;stmod=i3&amp;sthp=102&amp;stkw=75&amp;age=24&amp;styea=2013&amp;stmon=11&amp;stmil=25000&amp;stccm=0&amp;eutax=106801&amp;carid=279920112&amp;p=detail&amp;splz=&amp;width=3&amp;test=off&amp;rnd=65";
        if (window.location) OA_pop+="&amp;loc="+escape(window.location);
        if (document.referrer) OA_pop+="&amp;referer="+escape(document.referrer);
        OA_pop+="'><"+"/script>";

        document.write(OA_pop);
    }
var OA_fo = '';
OA_fo += "<"+"script type=\'text/javascript\' src=\'http://c.autoscout24.com/fl.js\'><"+"/script>\n";
document.write(OA_fo);
