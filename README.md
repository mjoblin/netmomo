# netmomo

netmomo displays computer network information based on a packet sniffing
back-end.

netmomo is primarily an experiment in writing a
[React](https://facebook.github.io/react/) / 
[Redux](http://redux.js.org/) / 
[Ant](https://ant.design/) application driven by data arriving over a
websocket. The data is provided by a network packet sniffing framework called
[NetDumplings](https://netdumplings.readthedocs.org). NetDumplings takes care
of the back-end (network packet sniffing and processing) and netmomo takes care
of the front-end display.

netmomo displays very rudimentary information on packet protocol counts, DNS
lookups, and ARP traffic. It is far from being a useful network monitoring
application. The idea is that it could in theory be extended (along with the
NetDumplings chef implementations) to end up with a more useful application.

<img alt="home" width="250" src="../screenshots/screenshots/home.png">
<img alt="dns" width="250" src="../screenshots/screenshots/dns.png">
<img alt="packet counts table" width="250" src="../screenshots/screenshots/packetcounts_table.png">
<img alt="packet counts chart" width="250" src="../screenshots/screenshots/packetcounts_chart.png">
<img alt="system status" width="250" src="../screenshots/screenshots/systemstatus_kitchens.png">
<img alt="system status" width="250" src="../screenshots/screenshots/systemstatus_eaters.png">
<img alt="settings" width="250 "src="../screenshots/screenshots/settings.png">

## Installation

```commandline
$ git clone https://github.com/mjoblin/netmomo.git
$ cd netmomo
$ npm install
$ npm start
```

netmomo will then be accessible on `http://localhost:3000`.

You also need to
[install NetDumplings](https://netdumplings.readthedocs.io/en/latest/pages/installation.html)
and then start `nd-shifty` (the websocket server) and `nd-snifty` (the packet
sniffer):

```bash
# in one terminal, start the websocket server
$ nd-shifty

# in a second terminal, start the packet sniffer
$ nd-snifty --interface en0 --filter "tcp or icmp or udp or arp"
```