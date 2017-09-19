# netmomo

netmomo is a [NetDumplings](https://netdumplings.readthedocs.org) web viewer.
It's primarily an experiment in writing a
[React](https://facebook.github.io/react/) / 
[Redux](http://redux.js.org/) / 
[Ant](https://ant.design/) application driven by data arriving over a websocket.

NetDumpings takes care of the back-end (network packet sniffing and processing)
and netmomo takes care of the front-end display.

netmomo currently displays some rudimentary information on packet protocol
counts, DNS lookups, and ARP traffic. The idea is that it could be extended
(along with the NetDumplings chef implementations) to end up with more useful
application. It's also a little more practical than other NetDumplings viewers
like [packscape](https://github.com/mjoblin/packscape).

## Installation

```bash
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