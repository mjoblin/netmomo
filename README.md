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

### Home screen

The main home screen of netmomo.

<img alt="home" width="800" src="../screenshots/screenshots/home.png">

### DNS lookups

DNS lookups filtered to those containing 'apple.com'.

<img alt="dns" width="800" src="../screenshots/screenshots/dns.png">

### Packet counts (table)

A table of packet counts by protocol.

<img alt="packet counts table" width="800" src="../screenshots/screenshots/packetcounts_table.png">

### Packet counts (chart)

A chart of packet counts by protocol.

<img alt="packet counts chart" width="800" src="../screenshots/screenshots/packetcounts_chart.png">

### System status (kitchens)

NetDumplings kitchens are the packet sniffing processors (written in Python)
registered with the back-end.

<img alt="system status" width="800" src="../screenshots/screenshots/systemstatus_kitchens.png">

### System status (eaters)

NetDumpling eaters are the websocket clients receiving packet sniffing
information from the NetDumplings back-end (via the `shifty` websocket server
that they all connect to). This shows netmomo and another client called
'dumplingprinter' (a NetDumplings commandline helper tool).

<img alt="system status" width="800" src="../screenshots/screenshots/systemstatus_eaters.png">

### Settings

A simple settings screen to tell netmomo where it can find the NetDumplings
`shifty` websocket server.

<img alt="settings" width="800 "src="../screenshots/screenshots/settings.png">

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