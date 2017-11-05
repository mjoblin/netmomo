# netmomo

netmomo displays computer network information provided by a packet sniffing
back-end (NetDumplings) in a web browser.

netmomo is primarily an experiment in writing a
[React](https://facebook.github.io/react/) / 
[Redux](http://redux.js.org/) / 
[Ant](https://ant.design/) application driven by data arriving over a
websocket. The data is provided by a network packet sniffing framework called
[NetDumplings](https://netdumplings.readthedocs.org). NetDumplings takes care
of the back-end (network packet sniffing and processing) and netmomo takes care
of the front-end display.

netmomo as-is displays very rudimentary information on packet protocol counts,
DNS lookups, and ARP traffic. It is far from being a useful network monitoring
application. The idea is that it shows a potential approach for taking a packet
sniffing back end and using it to display the results in a web browser.

If it can be sniffed, it can be displayed by netmomo.

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

<img alt="settings" width="800" src="../screenshots/screenshots/settings.png">

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

If you want to see the packet data being emitted from `nd-shifty` (i.e. the
same data being sent to netmomo):

```
# in a third terminal, start the dumpling printer:
$ nd-printer
```

## The code

netmomo is a [React](https://facebook.github.io/react/) application using
[Redux](http://redux.js.org/) for state management and
[Ant](https://ant.design/) as the visual component library.

[webpack](https://webpack.js.org/) is used for building,
[Babel](https://babeljs.io/) for code transpiling, and
[Jest](https://facebook.github.io/jest/) for testing.

### Code layout

* `app/` holds the main application.
* `app/components/` contains React components shared across the application.
* `app/modules/` contains the various application modules, where the modules
  include ARP, DNS, Settings, etc.
    * `app/modules/app/` is a special top-level module which defines the main
      application layout.
        * **`app/modules/app/sagas.js` contains the code for opening the
          WebSocket connection to the NetDumplings back-end, receiving
          dumplings, and re-emitting them as `app/DUMPLING` Redux actions.**
    * Each module can contain the following:
        * `components/` - React components.
        * `actions.js` - Redux action creators (which send data from the
          application to the Redux store).
        * `actionTypes.js` - Redux action names.
        * `constants.js` - Module constants.
        * `reducer.js` - Redux reducer (which updates the Redux store; i.e.
           changes the application state).
            * **Most module reducers will listen for the `app/DUMPLING` action,
              check which NetDumplings chef generated the dumpling, and if it's
              a chef/dumpling that the module cares about then the action will
              be used to update the module's slice of the Redux state.**
        * `sagas.js` - Redux sagas (mostly used for async Redux state updates).
        * `selectors.js` - Redux selectors (which retrieve/filter/etc data from
           the Redux store).
* `app/services/` holds shared non-React application services.
* `app/store/` configures the Redux application data store.
* The `_tests__` and `__mock__` directories hold
  Jest-related test files.

### Linting

To run the ESLint code linter:

```
$ npm run lint
```
 
### Tests

To run the Jest tests and generate coverage information (under `coverage/`):

```
$ npm test
```