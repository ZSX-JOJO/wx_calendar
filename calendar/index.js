!(function(e) {
  var t = {};
  function a(n) {
    if (t[n]) return t[n].exports;
    var s = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(s.exports, s, s.exports, a), (s.l = !0), s.exports;
  }
  (a.m = e),
    (a.c = t),
    (a.d = function(e, t, n) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (a.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (a.t = function(e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (a.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var s in e)
          a.d(
            n,
            s,
            function(t) {
              return e[t];
            }.bind(null, s)
          );
      return n;
    }),
    (a.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return a.d(t, 'a', t), t;
    }),
    (a.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (a.p = ''),
    a((a.s = 8));
})([
  function(e, t, a) {
    'use strict';
    let n;
    function s() {
      return n || (n = wx.getSystemInfoSync());
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.getSystemInfo = s),
      (t.isComponent = function(e) {
        return (
          e &&
          void 0 !== e.__wxExparserNodeId__ &&
          'function' == typeof e.setData
        );
      }),
      (t.isIos = c),
      (t.getCurrentPage = l),
      (t.getComponent = function(e) {
        const t = new r();
        let a = l() || {};
        if (a.selectComponent && 'function' == typeof a.selectComponent) {
          if (e) return a.selectComponent(e);
          t.warn('请传入组件ID');
        } else t.warn('该基础库暂不支持多个小程序日历组件');
      }),
      (t.uniqueArrayByDate = function(e = []) {
        let t = {},
          a = [];
        e.forEach(e => {
          t[`${e.year}-${e.month}-${e.day}`] = e;
        });
        for (let e in t) a.push(t[e]);
        return a;
      }),
      (t.delRepeatedEnableDay = function(e = [], t = []) {
        let a, n;
        if (2 === t.length) {
          const { startTimestamp: e, endTimestamp: s } = d(t);
          (a = e), (n = s);
        }
        return b(e).filter(e => e < a || e > n);
      }),
      (t.convertEnableAreaToTimestamp = d),
      (t.converEnableDaysToTimestamp = b),
      (t.initialTasks = t.GetDate = t.Slide = t.Logger = void 0);
    class r {
      info(e) {
        console.log(
          '%cInfo: %c' + e,
          'color:#FF0080;font-weight:bold',
          'color: #FF509B'
        );
      }
      warn(e) {
        console.log(
          '%cWarn: %c' + e,
          'color:#FF6600;font-weight:bold',
          'color: #FF9933'
        );
      }
      tips(e) {
        console.log(
          '%cTips: %c' + e,
          'color:#00B200;font-weight:bold',
          'color: #00CC33'
        );
      }
    }
    t.Logger = r;
    t.Slide = class {
      isUp(e = {}, t = {}) {
        const { startX: a, startY: n } = e,
          s = t.clientX - a;
        return (
          t.clientY - n < -60 &&
          s < 20 &&
          s > -20 &&
          ((this.slideLock = !1), !0)
        );
      }
      isDown(e = {}, t = {}) {
        const { startX: a, startY: n } = e,
          s = t.clientX - a;
        return t.clientY - n > 60 && s < 20 && s > -20;
      }
      isLeft(e = {}, t = {}) {
        const { startX: a, startY: n } = e,
          s = t.clientX - a,
          r = t.clientY - n;
        return s < -60 && r < 20 && r > -20;
      }
      isRight(e = {}, t = {}) {
        const { startX: a, startY: n } = e,
          s = t.clientX - a,
          r = t.clientY - n;
        return s > 60 && r < 20 && r > -20;
      }
    };
    class o {
      newDate(e, t, a) {
        let n = `${+e}-${+t}-${+a}`;
        return c() && (n = `${+e}/${+t}/${+a}`), new Date(n);
      }
      thisMonthDays(e, t) {
        return new Date(Date.UTC(e, t, 0)).getUTCDate();
      }
      firstDayOfWeek(e, t) {
        return new Date(Date.UTC(e, t - 1, 1)).getUTCDay();
      }
      dayOfWeek(e, t, a) {
        return new Date(Date.UTC(e, t - 1, a)).getUTCDay();
      }
      todayDate() {
        const e = new Date();
        return {
          year: e.getFullYear(),
          month: e.getMonth() + 1,
          date: e.getDate()
        };
      }
      todayTimestamp() {
        const { year: e, month: t, date: a } = this.todayDate();
        return this.newDate(e, t, a).getTime();
      }
    }
    function c() {
      const e = s();
      return /iphone|ios/i.test(e.platform);
    }
    function l() {
      const e = getCurrentPages();
      return e[e.length - 1];
    }
    function d(e = []) {
      const t = new o(),
        a = e[0].split('-'),
        n = e[1].split('-'),
        s = new r();
      return 3 !== a.length || 3 !== n.length
        ? (s.warn('enableArea() 参数格式为: ["2018-2-1", "2018-3-1"]'), {})
        : {
            start: a,
            end: n,
            startTimestamp: t.newDate(a[0], a[1], a[2]).getTime(),
            endTimestamp: t.newDate(n[0], n[1], n[2]).getTime()
          };
    }
    function b(e = []) {
      const t = new r(),
        a = new o(),
        n = [];
      return (
        e.forEach(e => {
          if ('string' != typeof e)
            return t.warn('enableDays()入参日期格式错误');
          const s = e.split('-');
          if (3 !== s.length) return t.warn('enableDays()入参日期格式错误');
          const r = a.newDate(s[0], s[1], s[2]).getTime();
          n.push(r);
        }),
        n
      );
    }
    t.GetDate = o;
    t.initialTasks = { flag: 'finished', tasks: [] };
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n = class {
      constructor(e) {
        this.Component = e;
      }
      getData(e) {
        const t = this.Component.data;
        if (!e) return t;
        if (e.includes('.')) {
          return e.split('.').reduce((e, t) => e[t], t);
        }
        return this.Component.data[e];
      }
      setData(e, t = () => {}) {
        e && 'object' == typeof e && this.Component.setData(e, t);
      }
    };
    t.default = n;
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n = o(a(1)),
      s = o(a(3)),
      r = a(0);
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const c = new r.Logger(),
      l = new r.GetDate();
    class d extends n.default {
      constructor(e) {
        super(e), (this.Component = e);
      }
      enableArea(e = []) {
        if (2 === e.length) {
          const { start: t, end: a, startTimestamp: n, endTimestamp: s } = (0,
          r.convertEnableAreaToTimestamp)(e);
          if (!t || !a) return;
          const o = l.thisMonthDays(t[0], t[1]),
            c = l.thisMonthDays(a[0], a[1]);
          if (
            this.__judgeParam({
              start: t,
              end: a,
              startMonthDays: o,
              endMonthDays: c,
              startTimestamp: n,
              endTimestamp: s
            })
          ) {
            let { days: t = [], selectedDay: a = [] } = this.getData(
              'calendar'
            );
            const r = this.__handleEnableArea(
              { area: e, days: t, startTimestamp: n, endTimestamp: s },
              a
            );
            this.setData({
              'calendar.enableArea': e,
              'calendar.days': r.dates,
              'calendar.selectedDay': r.selectedDay,
              'calendar.enableAreaTimestamp': [n, s]
            });
          }
        } else
          c.warn(
            'enableArea()参数需为时间范围数组，形如：["2018-8-4" , "2018-8-24"]'
          );
      }
      enableDays(e = []) {
        const { enableArea: t = [] } = this.getData('calendar');
        let a = [];
        a = t.length
          ? (0, r.delRepeatedEnableDay)(e, t)
          : (0, r.converEnableDaysToTimestamp)(e);
        let { days: n = [], selectedDay: s = [] } = this.getData('calendar');
        const o = this.__handleEnableDays(
          { days: n, expectEnableDaysTimestamp: a },
          s
        );
        this.setData({
          'calendar.days': o.dates,
          'calendar.selectedDay': o.selectedDay,
          'calendar.enableDays': e,
          'calendar.enableDaysTimestamp': a
        });
      }
      setSelectedDays(e) {
        if (!(0, s.default)(this.Component).getCalendarConfig().multi)
          return c.warn('单选模式下不能设置多日期选中，请配置 multi');
        let { days: t } = this.getData('calendar'),
          a = [];
        if (e) {
          if (e && e.length) {
            const { dates: n, selectedDates: s } = this.__handleSelectedDays(
              t,
              a,
              e
            );
            (t = n), (a = s);
          }
        } else
          t.map(e => {
            (e.choosed = !0), (e.showTodoLabel = !1);
          }),
            (a = t);
        (0, s.default)(this.Component).setCalendarConfig('multi', !0),
          this.setData({ 'calendar.days': t, 'calendar.selectedDay': a });
      }
      disableDays(e) {
        const { disableDays: t = [], days: a } = this.getData('calendar');
        if ('[object Array]' !== Object.prototype.toString.call(e))
          return c.warn('disableDays 参数为数组');
        let n = [];
        if (e.length) {
          const s = (n = (0, r.uniqueArrayByDate)(e.concat(t))).map(
            e => `${e.year}-${e.month}-${e.day}`
          );
          a.forEach(e => {
            const t = `${e.year}-${e.month}-${e.day}`;
            s.includes(t) && (e.disable = !0);
          });
        } else
          a.forEach(e => {
            e.disable = !1;
          });
        this.setData({ 'calendar.days': a, 'calendar.disableDays': n });
      }
      setDateStyle(e) {
        const { days: t, specialStyleDates: a } = this.getData('calendar');
        if ((a && a.length && (e = a), !e || !e.length)) return;
        const n = e.map(e => `${e.year}_${e.month}_${e.day}`),
          s = t.map(t => {
            const a = n.indexOf(`${t.year}_${t.month}_${t.day}`);
            return a > -1 ? { ...t, class: e[a].class } : { ...t };
          });
        this.setData({ 'calendar.days': s, 'calendar.specialStyleDates': e });
      }
      __judgeParam(e) {
        const {
          start: t,
          end: a,
          startMonthDays: n,
          endMonthDays: s,
          startTimestamp: r,
          endTimestamp: o
        } = e;
        return t[2] > n || t[2] < 1
          ? (c.warn(
              'enableArea() 开始日期错误，指定日期不在当前月份天数范围内'
            ),
            !1)
          : t[1] > 12 || t[1] < 1
          ? (c.warn('enableArea() 开始日期错误，月份超出1-12月份'), !1)
          : a[2] > s || a[2] < 1
          ? (c.warn(
              'enableArea() 截止日期错误，指定日期不在当前月份天数范围内'
            ),
            !1)
          : a[1] > 12 || a[1] < 1
          ? (c.warn('enableArea() 截止日期错误，月份超出1-12月份'), !1)
          : !(r > o) || (c.warn('enableArea()参数最小日期大于了最大日期'), !1);
      }
      __handleEnableArea(e = {}, t = []) {
        const { area: a, days: n, startTimestamp: s, endTimestamp: o } = e,
          c = this.getData('calendar.enableDays') || [];
        let d = [];
        c.length && (d = (0, r.delRepeatedEnableDay)(c, a));
        const b = [...n];
        return (
          b.forEach(e => {
            const a = l.newDate(e.year, e.month, e.day).getTime();
            (+s > +a || +a > +o) && !d.includes(+a)
              ? ((e.disable = !0),
                e.choosed &&
                  ((e.choosed = !1),
                  (t = t.filter(
                    t =>
                      `${e.year}-${e.month}-${e.day}` !==
                      `${t.year}-${t.month}-${t.day}`
                  ))))
              : e.disable && (e.disable = !1);
          }),
          { dates: b, selectedDay: t }
        );
      }
      __handleEnableDays(e = {}, t = []) {
        const { days: a, expectEnableDaysTimestamp: n } = e,
          { enableAreaTimestamp: s = [] } = this.getData('calendar'),
          r = [...a];
        return (
          r.forEach(e => {
            const a = l.newDate(e.year, e.month, e.day).getTime();
            let r = !1;
            s.length
              ? (+s[0] > +a || +a > +s[1]) && !n.includes(+a) && (r = !0)
              : n.includes(+a) || (r = !0),
              r
                ? ((e.disable = !0),
                  e.choosed &&
                    ((e.choosed = !1),
                    (t = t.filter(
                      t =>
                        `${e.year}-${e.month}-${e.day}` !==
                        `${t.year}-${t.month}-${t.day}`
                    ))))
                : (e.disable = !1);
          }),
          { dates: r, selectedDay: t }
        );
      }
      __handleSelectedDays(e = [], t = [], a) {
        const { selectedDay: n, showLabelAlways: s } = this.getData('calendar');
        t = n && n.length ? (0, r.uniqueArrayByDate)(n.concat(a)) : a;
        const { year: o, month: c } = e[0],
          l = [];
        return (
          t.forEach(e => {
            +e.year == +o &&
              +e.month == +c &&
              l.push(`${e.year}-${e.month}-${e.day}`);
          }),
          [...e].map(e => {
            l.includes(`${e.year}-${e.month}-${e.day}`) &&
              ((e.choosed = !0),
              s && e.showTodoLabel
                ? (e.showTodoLabel = !0)
                : (e.showTodoLabel = !1));
          }),
          { dates: e, selectedDates: t }
        );
      }
    }
    t.default = e => new d(e);
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    class n {
      constructor(e) {
        this.Component = e;
      }
      getCalendarConfig() {
        return this.Component && this.Component.config
          ? this.Component.config
          : {};
      }
      setCalendarConfig(e, t) {
        this.Component &&
          this.Component.config &&
          (this.Component.config[e] = t);
      }
    }
    t.default = e => new n(e);
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    const n = {
        lunarInfo: [
          19416,
          19168,
          42352,
          21717,
          53856,
          55632,
          91476,
          22176,
          39632,
          21970,
          19168,
          42422,
          42192,
          53840,
          119381,
          46400,
          54944,
          44450,
          38320,
          84343,
          18800,
          42160,
          46261,
          27216,
          27968,
          109396,
          11104,
          38256,
          21234,
          18800,
          25958,
          54432,
          59984,
          28309,
          23248,
          11104,
          100067,
          37600,
          116951,
          51536,
          54432,
          120998,
          46416,
          22176,
          107956,
          9680,
          37584,
          53938,
          43344,
          46423,
          27808,
          46416,
          86869,
          19872,
          42416,
          83315,
          21168,
          43432,
          59728,
          27296,
          44710,
          43856,
          19296,
          43748,
          42352,
          21088,
          62051,
          55632,
          23383,
          22176,
          38608,
          19925,
          19152,
          42192,
          54484,
          53840,
          54616,
          46400,
          46752,
          103846,
          38320,
          18864,
          43380,
          42160,
          45690,
          27216,
          27968,
          44870,
          43872,
          38256,
          19189,
          18800,
          25776,
          29859,
          59984,
          27480,
          21952,
          43872,
          38613,
          37600,
          51552,
          55636,
          54432,
          55888,
          30034,
          22176,
          43959,
          9680,
          37584,
          51893,
          43344,
          46240,
          47780,
          44368,
          21977,
          19360,
          42416,
          86390,
          21168,
          43312,
          31060,
          27296,
          44368,
          23378,
          19296,
          42726,
          42208,
          53856,
          60005,
          54576,
          23200,
          30371,
          38608,
          19195,
          19152,
          42192,
          118966,
          53840,
          54560,
          56645,
          46496,
          22224,
          21938,
          18864,
          42359,
          42160,
          43600,
          111189,
          27936,
          44448,
          84835,
          37744,
          18936,
          18800,
          25776,
          92326,
          59984,
          27424,
          108228,
          43744,
          41696,
          53987,
          51552,
          54615,
          54432,
          55888,
          23893,
          22176,
          42704,
          21972,
          21200,
          43448,
          43344,
          46240,
          46758,
          44368,
          21920,
          43940,
          42416,
          21168,
          45683,
          26928,
          29495,
          27296,
          44368,
          84821,
          19296,
          42352,
          21732,
          53600,
          59752,
          54560,
          55968,
          92838,
          22224,
          19168,
          43476,
          41680,
          53584,
          62034,
          54560
        ],
        solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Gan: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        Zhi: [
          '子',
          '丑',
          '寅',
          '卯',
          '辰',
          '巳',
          '午',
          '未',
          '申',
          '酉',
          '戌',
          '亥'
        ],
        Animals: [
          '鼠',
          '牛',
          '虎',
          '兔',
          '龙',
          '蛇',
          '马',
          '羊',
          '猴',
          '鸡',
          '狗',
          '猪'
        ],
        solarTerm: [
          '小寒',
          '大寒',
          '立春',
          '雨水',
          '惊蛰',
          '春分',
          '清明',
          '谷雨',
          '立夏',
          '小满',
          '芒种',
          '夏至',
          '小暑',
          '大暑',
          '立秋',
          '处暑',
          '白露',
          '秋分',
          '寒露',
          '霜降',
          '立冬',
          '小雪',
          '大雪',
          '冬至'
        ],
        sTermInfo: [
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c3598082c95f8c965cc920f',
          '97bd0b06bdb0722c965ce1cfcc920f',
          'b027097bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c359801ec95f8c965cc920f',
          '97bd0b06bdb0722c965ce1cfcc920f',
          'b027097bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c359801ec95f8c965cc920f',
          '97bd0b06bdb0722c965ce1cfcc920f',
          'b027097bd097c36b0b6fc9274c91aa',
          '9778397bd19801ec9210c965cc920e',
          '97b6b97bd19801ec95f8c965cc920f',
          '97bd09801d98082c95f8e1cfcc920f',
          '97bd097bd097c36b0b6fc9210c8dc2',
          '9778397bd197c36c9210c9274c91aa',
          '97b6b97bd19801ec95f8c965cc920e',
          '97bd09801d98082c95f8e1cfcc920f',
          '97bd097bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36c9210c9274c91aa',
          '97b6b97bd19801ec95f8c965cc920e',
          '97bcf97c3598082c95f8e1cfcc920f',
          '97bd097bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36c9210c9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c3598082c95f8c965cc920f',
          '97bd097bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c3598082c95f8c965cc920f',
          '97bd097bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c359801ec95f8c965cc920f',
          '97bd097bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c359801ec95f8c965cc920f',
          '97bd097bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf97c359801ec95f8c965cc920f',
          '97bd097bd07f595b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9210c8dc2',
          '9778397bd19801ec9210c9274c920e',
          '97b6b97bd19801ec95f8c965cc920f',
          '97bd07f5307f595b0b0bc920fb0722',
          '7f0e397bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36c9210c9274c920e',
          '97b6b97bd19801ec95f8c965cc920f',
          '97bd07f5307f595b0b0bc920fb0722',
          '7f0e397bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36c9210c9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bd07f1487f595b0b0bc920fb0722',
          '7f0e397bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf7f1487f595b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf7f1487f595b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf7f1487f531b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c965cc920e',
          '97bcf7f1487f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b97bd19801ec9210c9274c920e',
          '97bcf7f0e47f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '9778397bd097c36b0b6fc9210c91aa',
          '97b6b97bd197c36c9210c9274c920e',
          '97bcf7f0e47f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '9778397bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36c9210c9274c920e',
          '97b6b7f0e47f531b0723b0b6fb0722',
          '7f0e37f5307f595b0b0bc920fb0722',
          '7f0e397bd097c36b0b6fc9210c8dc2',
          '9778397bd097c36b0b70c9274c91aa',
          '97b6b7f0e47f531b0723b0b6fb0721',
          '7f0e37f1487f595b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc9210c8dc2',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f595b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '9778397bd097c36b0b6fc9274c91aa',
          '97b6b7f0e47f531b0723b0787b0721',
          '7f0e27f0e47f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '9778397bd097c36b0b6fc9210c91aa',
          '97b6b7f0e47f149b0723b0787b0721',
          '7f0e27f0e47f531b0723b0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '9778397bd097c36b0b6fc9210c8dc2',
          '977837f0e37f149b0723b0787b0721',
          '7f07e7f0e47f531b0723b0b6fb0722',
          '7f0e37f5307f595b0b0bc920fb0722',
          '7f0e397bd097c35b0b6fc9210c8dc2',
          '977837f0e37f14998082b0787b0721',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e37f1487f595b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc9210c8dc2',
          '977837f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '977837f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd097c35b0b6fc920fb0722',
          '977837f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '977837f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '977837f0e37f14998082b0787b06bd',
          '7f07e7f0e47f149b0723b0787b0721',
          '7f0e27f0e47f531b0b0bb0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '977837f0e37f14998082b0723b06bd',
          '7f07e7f0e37f149b0723b0787b0721',
          '7f0e27f0e47f531b0723b0b6fb0722',
          '7f0e397bd07f595b0b0bc920fb0722',
          '977837f0e37f14898082b0723b02d5',
          '7ec967f0e37f14998082b0787b0721',
          '7f07e7f0e47f531b0723b0b6fb0722',
          '7f0e37f1487f595b0b0bb0b6fb0722',
          '7f0e37f0e37f14898082b0723b02d5',
          '7ec967f0e37f14998082b0787b0721',
          '7f07e7f0e47f531b0723b0b6fb0722',
          '7f0e37f1487f531b0b0bb0b6fb0722',
          '7f0e37f0e37f14898082b0723b02d5',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e37f1487f531b0b0bb0b6fb0722',
          '7f0e37f0e37f14898082b072297c35',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e37f0e37f14898082b072297c35',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e37f0e366aa89801eb072297c35',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f149b0723b0787b0721',
          '7f0e27f1487f531b0b0bb0b6fb0722',
          '7f0e37f0e366aa89801eb072297c35',
          '7ec967f0e37f14998082b0723b06bd',
          '7f07e7f0e47f149b0723b0787b0721',
          '7f0e27f0e47f531b0723b0b6fb0722',
          '7f0e37f0e366aa89801eb072297c35',
          '7ec967f0e37f14998082b0723b06bd',
          '7f07e7f0e37f14998083b0787b0721',
          '7f0e27f0e47f531b0723b0b6fb0722',
          '7f0e37f0e366aa89801eb072297c35',
          '7ec967f0e37f14898082b0723b02d5',
          '7f07e7f0e37f14998082b0787b0721',
          '7f07e7f0e47f531b0723b0b6fb0722',
          '7f0e36665b66aa89801e9808297c35',
          '665f67f0e37f14898082b0723b02d5',
          '7ec967f0e37f14998082b0787b0721',
          '7f07e7f0e47f531b0723b0b6fb0722',
          '7f0e36665b66a449801e9808297c35',
          '665f67f0e37f14898082b0723b02d5',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e36665b66a449801e9808297c35',
          '665f67f0e37f14898082b072297c35',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e26665b66a449801e9808297c35',
          '665f67f0e37f1489801eb072297c35',
          '7ec967f0e37f14998082b0787b06bd',
          '7f07e7f0e47f531b0723b0b6fb0721',
          '7f0e27f1487f531b0b0bb0b6fb0722'
        ],
        nStr1: [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六',
          '七',
          '八',
          '九',
          '十'
        ],
        nStr2: ['初', '十', '廿', '卅'],
        nStr3: [
          '正',
          '二',
          '三',
          '四',
          '五',
          '六',
          '七',
          '八',
          '九',
          '十',
          '冬',
          '腊'
        ],
        lYearDays: function(e) {
          let t,
            a = 348;
          for (t = 32768; t > 8; t >>= 1)
            a += n.lunarInfo[e - 1900] & t ? 1 : 0;
          return a + n.leapDays(e);
        },
        leapMonth: function(e) {
          return 15 & n.lunarInfo[e - 1900];
        },
        leapDays: function(e) {
          return n.leapMonth(e) ? (65536 & n.lunarInfo[e - 1900] ? 30 : 29) : 0;
        },
        monthDays: function(e, t) {
          return t > 12 || t < 1
            ? -1
            : n.lunarInfo[e - 1900] & (65536 >> t)
            ? 30
            : 29;
        },
        solarDays: function(e, t) {
          if (t > 12 || t < 1) return -1;
          const a = t - 1;
          return 1 == +a
            ? (e % 4 == 0 && e % 100 != 0) || e % 400 == 0
              ? 29
              : 28
            : n.solarMonth[a];
        },
        toGanZhiYear: function(e) {
          let t = (e - 3) % 10,
            a = (e - 3) % 12;
          return (
            0 == +t && (t = 10),
            0 == +a && (a = 12),
            n.Gan[t - 1] + n.Zhi[a - 1]
          );
        },
        toAstro: function(e, t) {
          return (
            '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(
              2 * e -
                (t < [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22][e - 1]
                  ? 2
                  : 0),
              2
            ) + '座'
          );
        },
        toGanZhi: function(e) {
          return n.Gan[e % 10] + n.Zhi[e % 12];
        },
        getTerm: function(e, t) {
          if (e < 1900 || e > 2100) return -1;
          if (t < 1 || t > 24) return -1;
          const a = n.sTermInfo[e - 1900],
            s = [
              parseInt('0x' + a.substr(0, 5)).toString(),
              parseInt('0x' + a.substr(5, 5)).toString(),
              parseInt('0x' + a.substr(10, 5)).toString(),
              parseInt('0x' + a.substr(15, 5)).toString(),
              parseInt('0x' + a.substr(20, 5)).toString(),
              parseInt('0x' + a.substr(25, 5)).toString()
            ],
            r = [
              s[0].substr(0, 1),
              s[0].substr(1, 2),
              s[0].substr(3, 1),
              s[0].substr(4, 2),
              s[1].substr(0, 1),
              s[1].substr(1, 2),
              s[1].substr(3, 1),
              s[1].substr(4, 2),
              s[2].substr(0, 1),
              s[2].substr(1, 2),
              s[2].substr(3, 1),
              s[2].substr(4, 2),
              s[3].substr(0, 1),
              s[3].substr(1, 2),
              s[3].substr(3, 1),
              s[3].substr(4, 2),
              s[4].substr(0, 1),
              s[4].substr(1, 2),
              s[4].substr(3, 1),
              s[4].substr(4, 2),
              s[5].substr(0, 1),
              s[5].substr(1, 2),
              s[5].substr(3, 1),
              s[5].substr(4, 2)
            ];
          return parseInt(r[t - 1]);
        },
        toChinaMonth: function(e) {
          if (e > 12 || e < 1) return -1;
          let t = n.nStr3[e - 1];
          return (t += '月');
        },
        toChinaDay: function(e) {
          let t;
          switch (e) {
            case 10:
              t = '初十';
              break;
            case 20:
              t = '二十';
              break;
            case 30:
              t = '三十';
              break;
            default:
              (t = n.nStr2[Math.floor(e / 10)]), (t += n.nStr1[e % 10]);
          }
          return t;
        },
        getAnimal: function(e) {
          return n.Animals[(e - 4) % 12];
        },
        solar2lunar: function(e, t, a) {
          if (e < 1900 || e > 2100) return -1;
          if (1900 == +e && 1 == +t && +a < 31) return -1;
          let s,
            r,
            o = 0,
            c = 0;
          (e = (s = e
            ? new Date(e, parseInt(t) - 1, a)
            : new Date()).getFullYear()),
            (t = s.getMonth() + 1),
            (a = s.getDate());
          let l =
            (Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) -
              Date.UTC(1900, 0, 31)) /
            864e5;
          for (r = 1900; r < 2101 && l > 0; r++) l -= c = n.lYearDays(r);
          l < 0 && ((l += c), r--);
          const d = new Date();
          let b = !1;
          d.getFullYear() === +e &&
            d.getMonth() + 1 === +t &&
            d.getDate() === +a &&
            (b = !0);
          let f = s.getDay();
          const i = n.nStr1[f];
          0 == +f && (f = 7);
          const h = r;
          o = n.leapMonth(r);
          let u = !1;
          for (r = 1; r < 13 && l > 0; r++)
            o > 0 && r === o + 1 && !1 === u
              ? (--r, (u = !0), (c = n.leapDays(h)))
              : (c = n.monthDays(h, r)),
              !0 === u && r === o + 1 && (u = !1),
              (l -= c);
          0 === l && o > 0 && r === o + 1 && (u ? (u = !1) : ((u = !0), --r)),
            l < 0 && ((l += c), --r);
          const y = r,
            m = l + 1,
            D = t - 1,
            g = n.toGanZhiYear(h),
            p = n.getTerm(e, 2 * t - 1),
            w = n.getTerm(e, 2 * t);
          let C = n.toGanZhi(12 * (e - 1900) + t + 11);
          a >= p && (C = n.toGanZhi(12 * (e - 1900) + t + 12));
          let T = !1,
            M = null;
          +p === a && ((T = !0), (M = n.solarTerm[2 * t - 2])),
            +w === a && ((T = !0), (M = n.solarTerm[2 * t - 1]));
          const k = Date.UTC(e, D, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10,
            _ = n.toGanZhi(k + a - 1),
            L = n.toAstro(t, a);
          return {
            lYear: h,
            lMonth: y,
            lDay: m,
            Animal: n.getAnimal(h),
            IMonthCn: (u ? '闰' : '') + n.toChinaMonth(y),
            IDayCn: n.toChinaDay(m),
            cYear: e,
            cMonth: t,
            cDay: a,
            gzYear: g,
            gzMonth: C,
            gzDay: _,
            isToday: b,
            isLeap: u,
            nWeek: f,
            ncWeek: '星期' + i,
            isTerm: T,
            Term: M,
            astro: L
          };
        },
        lunar2solar: function(e, t, a, s) {
          s = !!s;
          const r = n.leapMonth(e);
          if (s && r !== t) return -1;
          if (
            (2100 == +e && 12 == +t && +a > 1) ||
            (1900 == +e && 1 == +t && +a < 31)
          )
            return -1;
          const o = n.monthDays(e, t);
          let c = o;
          if ((s && (c = n.leapDays(e, t)), e < 1900 || e > 2100 || a > c))
            return -1;
          let l = 0;
          for (let t = 1900; t < e; t++) l += n.lYearDays(t);
          let d = 0,
            b = !1;
          for (let a = 1; a < t; a++)
            (d = n.leapMonth(e)),
              b || (d <= a && d > 0 && ((l += n.leapDays(e)), (b = !0))),
              (l += n.monthDays(e, a));
          s && (l += o);
          const f = Date.UTC(1900, 1, 30, 0, 0, 0),
            i = new Date(864e5 * (l + a - 31) + f),
            h = i.getUTCFullYear(),
            u = i.getUTCMonth() + 1,
            y = i.getUTCDate();
          return n.solar2lunar(h, u, y);
        }
      },
      {
        Gan: s,
        Zhi: r,
        nStr1: o,
        nStr2: c,
        nStr3: l,
        Animals: d,
        solarTerm: b,
        lunarInfo: f,
        sTermInfo: i,
        solarMonth: h,
        ...u
      } = n;
    var y = u;
    t.default = y;
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n = d(a(2)),
      s = d(a(1)),
      r = d(a(6)),
      o = d(a(3)),
      c = d(a(4)),
      l = a(0);
    function d(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const b = new l.GetDate(),
      f = new l.Logger();
    class i extends s.default {
      constructor(e) {
        super(e),
          (this.Component = e),
          (this.getCalendarConfig = (0, o.default)(
            this.Component
          ).getCalendarConfig);
      }
      switchWeek(e, t) {
        return new Promise((a, n) => {
          if ((0, o.default)(this.Component).getCalendarConfig().multi)
            return f.warn('多选模式不能切换周月视图');
          const { selectedDay: s = [], curYear: c, curMonth: l } = this.getData(
            'calendar'
          );
          if (!s.length) return this.__tipsWhenCanNotSwtich();
          const d = s[0];
          if ('week' === e) {
            if (this.Component.weekMode) return;
            const e = t || d,
              { year: s, month: r } = e;
            if (c !== s || l !== r) return this.__tipsWhenCanNotSwtich();
            (this.Component.weekMode = !0),
              this.setData({ 'calendar.weekMode': !0 }),
              this.jump(e)
                .then(a)
                .catch(n);
          } else
            (this.Component.weekMode = !1),
              this.setData({ 'calendar.weekMode': !1 }),
              (0, r.default)(this.Component)
                .renderCalendar(c, l, t)
                .then(a)
                .catch(n);
        });
      }
      updateCurrYearAndMonth(e) {
        let { days: t, curYear: a, curMonth: n } = this.getData('calendar');
        const { month: s } = t[0],
          { month: r } = t[t.length - 1],
          o = b.thisMonthDays(a, n),
          c = t[t.length - 1],
          l = t[0];
        return (
          (c.day + 7 > o || (n === s && s !== r)) && 'next' === e
            ? (n += 1) > 12 && ((a += 1), (n = 1))
            : (+l.day <= 7 || (n === r && s !== r)) &&
              'prev' === e &&
              (n -= 1) <= 0 &&
              ((a -= 1), (n = 12)),
          { Uyear: a, Umonth: n }
        );
      }
      calculateLastDay() {
        const { days: e = [], curYear: t, curMonth: a } = this.getData(
          'calendar'
        );
        return {
          lastDayInThisWeek: e[e.length - 1].day,
          lastDayInThisMonth: b.thisMonthDays(t, a)
        };
      }
      calculateFirstDay() {
        const { days: e } = this.getData('calendar');
        return { firstDayInThisWeek: e[0].day };
      }
      firstWeekInMonth(e, t, a) {
        let n = b.dayOfWeek(e, t, 1);
        const [, s] = [0, 7 - n];
        let o = this.getData('calendar.days') || [];
        return (
          this.Component.weekMode &&
            (o = (0, r.default)(this.Component).buildDate(e, t)),
          o.slice(0, a ? s + 1 : s)
        );
      }
      lastWeekInMonth(e, t, a) {
        const n = b.thisMonthDays(e, t),
          s = b.dayOfWeek(e, t, n),
          [o, c] = [n - s, n];
        let l = this.getData('calendar.days') || [];
        return (
          this.Component.weekMode &&
            (l = (0, r.default)(this.Component).buildDate(e, t)),
          l.slice(a ? o : o - 1, c)
        );
      }
      initSelectedDay(e) {
        let t = [...e];
        const { selectedDay: a = [] } = this.getData('calendar'),
          n = a.map(e => `${+e.year}-${+e.month}-${+e.day}`),
          s = this.getCalendarConfig();
        return (t = t.map(e => {
          let t = { ...e };
          return (
            n.includes(`${+t.year}-${+t.month}-${+t.day}`)
              ? (t.choosed = !0)
              : (t.choosed = !1),
            (t = this.__setTodoWhenJump(t, s)),
            s.showLunar && (t = this.__setSolarLunar(t)),
            s.highlightToday && (t = this.__highlightToday(t)),
            t
          );
        }));
      }
      setEnableAreaOnWeekMode(e = []) {
        let {
          todayTimestamp: t,
          enableAreaTimestamp: a = [],
          enableDaysTimestamp: n = []
        } = this.getData('calendar');
        e.forEach(e => {
          const s = b.newDate(e.year, e.month, e.day).getTime();
          let r = !1;
          a.length
            ? (+a[0] > +s || +s > +a[1]) && !n.includes(+s) && (r = !0)
            : n.length && !n.includes(+s) && (r = !0),
            r && ((e.disable = !0), (e.choosed = !1));
          const { disablePastDay: c } =
            (0, o.default)(this.Component).getCalendarConfig() || {};
          c && s - t < 0 && !e.disable && (e.disable = !0);
        });
      }
      calculateNextWeekDays() {
        let {
            lastDayInThisWeek: e,
            lastDayInThisMonth: t
          } = this.calculateLastDay(),
          { curYear: a, curMonth: s } = this.getData('calendar'),
          r = [];
        if (t - e >= 7) {
          const { Uyear: t, Umonth: n } = this.updateCurrYearAndMonth('next');
          (a = t), (s = n);
          for (let t = e + 1; t <= e + 7; t++)
            r.push({ year: a, month: s, day: t, week: b.dayOfWeek(a, s, t) });
        } else {
          for (let n = e + 1; n <= t; n++)
            r.push({ year: a, month: s, day: n, week: b.dayOfWeek(a, s, n) });
          const { Uyear: n, Umonth: o } = this.updateCurrYearAndMonth('next');
          (a = n), (s = o);
          for (let n = 1; n <= 7 - (t - e); n++)
            r.push({ year: a, month: s, day: n, week: b.dayOfWeek(a, s, n) });
        }
        (r = this.initSelectedDay(r)),
          this.setEnableAreaOnWeekMode(r),
          this.setData(
            {
              'calendar.curYear': a,
              'calendar.curMonth': s,
              'calendar.days': r
            },
            () => {
              (0, n.default)(this.Component).setDateStyle();
            }
          );
      }
      calculatePrevWeekDays() {
        let { firstDayInThisWeek: e } = this.calculateFirstDay(),
          { curYear: t, curMonth: a } = this.getData('calendar'),
          s = [];
        if (e - 7 > 0) {
          const { Uyear: n, Umonth: r } = this.updateCurrYearAndMonth('prev');
          (t = n), (a = r);
          for (let n = e - 7; n < e; n++)
            s.push({ year: t, month: a, day: n, week: b.dayOfWeek(t, a, n) });
        } else {
          let n = [];
          for (let s = 1; s < e; s++)
            n.push({ year: t, month: a, day: s, week: b.dayOfWeek(t, a, s) });
          const { Uyear: r, Umonth: o } = this.updateCurrYearAndMonth('prev');
          (t = r), (a = o);
          const c = b.thisMonthDays(t, a);
          for (let n = c - Math.abs(e - 7); n <= c; n++)
            s.push({ year: t, month: a, day: n, week: b.dayOfWeek(t, a, n) });
          s = s.concat(n);
        }
        (s = this.initSelectedDay(s)),
          this.setEnableAreaOnWeekMode(s),
          this.setData(
            {
              'calendar.curYear': t,
              'calendar.curMonth': a,
              'calendar.days': s
            },
            () => {
              (0, n.default)(this.Component).setDateStyle();
            }
          );
      }
      calculateDatesWhenJump(
        { year: e, month: t, day: a },
        { firstWeekDays: n, lastWeekDays: s },
        r
      ) {
        const o = this.__dateIsInWeek({ year: e, month: t, day: a }, n),
          c = this.__dateIsInWeek({ year: e, month: t, day: a }, s);
        let l = [];
        return (l = o
          ? this.__calculateDatesWhenInFirstWeek(n, r)
          : c
          ? this.__calculateDatesWhenInLastWeek(s, r)
          : this.__calculateDates({ year: e, month: t, day: a }));
      }
      jump({ year: e, month: t, day: a }) {
        return new Promise(s => {
          if (!a) return;
          const r = this.getCalendarConfig(),
            o = 'Mon' === r.firstDayOfWeek,
            c = this.firstWeekInMonth(e, t, o);
          let l = this.lastWeekInMonth(e, t, o),
            d = this.calculateDatesWhenJump(
              { year: e, month: t, day: a },
              { firstWeekDays: c, lastWeekDays: l },
              o
            );
          (d = d.map(n => {
            let s = { ...n };
            return (
              +s.year == +e &&
                +s.month == +t &&
                +s.day == +a &&
                (s.choosed = !0),
              (s = this.__setTodoWhenJump(s, r)),
              r.showLunar && (s = this.__setSolarLunar(s)),
              r.highlightToday && (s = this.__highlightToday(s)),
              s
            );
          })),
            this.setEnableAreaOnWeekMode(d),
            this.setData(
              {
                'calendar.days': d,
                'calendar.curYear': e,
                'calendar.curMonth': t,
                'calendar.empytGrids': [],
                'calendar.lastEmptyGrids': [],
                'calendar.selectedDay': d.filter(e => e.choosed)
              },
              () => {
                (0, n.default)(this.Component).setDateStyle(), s();
              }
            );
        });
      }
      __setTodoWhenJump(e) {
        const t = { ...e },
          { todoLabels: a = [], showLabelAlways: n } = this.getData('calendar'),
          s = a
            .map(e => `${+e.year}-${+e.month}-${+e.day}`)
            .indexOf(`${+t.year}-${+t.month}-${+t.day}`);
        if (-1 !== s) {
          t.showTodoLabel = !!n || !t.choosed;
          const e = a[s] || {};
          t.showTodoLabel && e.todoText && (t.todoText = e.todoText);
        }
        return t;
      }
      __setSolarLunar(e) {
        const t = { ...e };
        return (t.lunar = c.default.solar2lunar(+t.year, +t.month, +t.day)), t;
      }
      __highlightToday(e) {
        const t = { ...e },
          a = b.todayDate(),
          n = +a.year == +t.year && +a.month == +t.month && +t.day == +a.date;
        return (t.isToday = n), t;
      }
      __calculateDatesWhenInFirstWeek(e, t) {
        const a = [...e];
        if (a.length < 7) {
          let e,
            { year: t, month: n } = a[0],
            s = 7 - a.length;
          for (
            n > 1
              ? ((n -= 1), (e = b.thisMonthDays(t, n)))
              : ((n = 12), (t -= 1), (e = b.thisMonthDays(t, n)));
            s;

          )
            a.unshift({
              year: t,
              month: n,
              day: e,
              week: b.dayOfWeek(t, n, e)
            }),
              (e -= 1),
              (s -= 1);
        }
        return a;
      }
      __calculateDatesWhenInLastWeek(e, t) {
        const a = [...e];
        if (t && a.length < 7) {
          let { year: e, month: t } = a[0],
            n = 7 - a.length,
            s = 1;
          for (t > 11 ? ((t = 1), (e += 1)) : (t += 1); n; )
            a.push({ year: e, month: t, day: s, week: b.dayOfWeek(e, t, s) }),
              (s += 1),
              (n -= 1);
        }
        return a;
      }
      __calculateDates({ year: e, month: t, day: a }, n) {
        const s = b.dayOfWeek(e, t, a);
        let o = [a - s, a + (6 - s)];
        return (
          n && (o = [a + 1 - s, a + (7 - s)]),
          (0, r.default)(this.Component)
            .buildDate(e, t)
            .slice(o[0] - 1, o[1])
        );
      }
      __dateIsInWeek(e, t) {
        return t.find(
          t => +t.year == +e.year && +t.month == +e.month && +t.day == +e.day
        );
      }
      __tipsWhenCanNotSwtich() {
        f.info(
          '当前月份未选中日期下切换为周视图，不能明确该展示哪一周的日期，故此情况不允许切换'
        );
      }
    }
    t.default = e => new i(e);
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n = l(a(2)),
      s = l(a(7)),
      r = l(a(1)),
      o = l(a(4)),
      c = a(0);
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const d = new c.GetDate();
    class b extends r.default {
      constructor(e) {
        super(e), (this.Component = e);
      }
      getCalendarConfig() {
        return this.Component.config;
      }
      renderCalendar(e, t, a) {
        return new Promise(r => {
          this.calculateEmptyGrids(e, t),
            this.calculateDays(e, t, a).then(() => {
              const { todoLabels: a, specialStyleDates: o } =
                this.getData('calendar') || {};
              a &&
                o.length &&
                a.find(a => +a.month == +t && +a.year == +e) &&
                (0, s.default)(this.Component).setTodoLabels(),
                o &&
                  o.length &&
                  o.find(a => +a.month == +t && +a.year == +e) &&
                  (0, n.default)(this.Component).setDateStyle(),
                this.Component.firstRender
                  ? r({ firstRender: !1 })
                  : r({ firstRender: !0 });
            });
        });
      }
      calculateEmptyGrids(e, t) {
        this.calculatePrevMonthGrids(e, t), this.calculateNextMonthGrids(e, t);
      }
      calculatePrevMonthGrids(e, t) {
        let a = [];
        const n = d.thisMonthDays(e, t - 1);
        let s = d.firstDayOfWeek(e, t);
        const r = this.getCalendarConfig() || {};
        if (
          ('Mon' === r.firstDayOfWeek && (0 === s ? (s = 6) : (s -= 1)), s > 0)
        ) {
          const c = n - s,
            { onlyShowCurrentMonth: l } = r,
            { showLunar: d } = this.getCalendarConfig();
          for (let s = n; s > c; s--)
            l
              ? a.push('')
              : a.push({
                  day: s,
                  lunar: d ? o.default.solar2lunar(e, t - 1, s) : null
                });
          this.setData({ 'calendar.empytGrids': a.reverse() });
        } else this.setData({ 'calendar.empytGrids': null });
      }
      calculateExtraEmptyDate(e, t, a) {
        let n = 0;
        if (2 == +t) {
          n += 7;
          let s = d.dayOfWeek(e, t, 1);
          'Mon' === a.firstDayOfWeek
            ? 1 == +s && (n += 7)
            : 0 == +s && (n += 7);
        } else {
          let s = d.dayOfWeek(e, t, 1);
          'Mon' === a.firstDayOfWeek
            ? 0 !== s && s < 6 && (n += 7)
            : s < 5 && (n += 7);
        }
        return n;
      }
      calculateNextMonthGrids(e, t) {
        let a = [];
        const n = d.thisMonthDays(e, t);
        let s = d.dayOfWeek(e, t, n);
        const r = this.getCalendarConfig() || {};
        'Mon' === r.firstDayOfWeek && (0 === s ? (s = 6) : (s -= 1));
        let c = 7 - (s + 1);
        const { onlyShowCurrentMonth: l, showLunar: b } = r;
        l || (c += this.calculateExtraEmptyDate(e, t, r));
        for (let n = 1; n <= c; n++)
          l
            ? a.push('')
            : a.push({
                day: n,
                lunar: b ? o.default.solar2lunar(e, t + 1, n) : null
              });
        this.setData({ 'calendar.lastEmptyGrids': a });
      }
      setSelectedDay(e, t, a) {
        let n = [];
        const s = this.getCalendarConfig();
        if (s.noDefault) (n = []), (s.noDefault = !1);
        else {
          const s = this.getData('calendar') || {},
            { showLunar: r } = this.getCalendarConfig();
          n = a
            ? [
                {
                  year: e,
                  month: t,
                  day: a,
                  choosed: !0,
                  week: d.dayOfWeek(e, t, a),
                  lunar: r ? o.default.solar2lunar(e, t, a) : null
                }
              ]
            : s.selectedDay;
        }
        return n;
      }
      buildDate(e, t) {
        const a = d.todayDate(),
          n = d.thisMonthDays(e, t),
          s = [];
        for (let r = 1; r <= n; r++) {
          const n = +a.year == +e && +a.month == +t && r === +a.date,
            o = this.getCalendarConfig();
          s.push({
            year: e,
            month: t,
            day: r,
            choosed: !1,
            week: d.dayOfWeek(e, t, r),
            isToday: n && o.highlightToday
          });
        }
        return s;
      }
      calculateDays(e, t, a) {
        return new Promise((n, s) => {
          let r = [];
          const { todayTimestamp: c, disableDays: l = [] } = this.getData(
            'calendar'
          );
          r = this.buildDate(e, t);
          const b = this.setSelectedDay(e, t, a),
            f = b.map(e => `${+e.year}-${+e.month}-${+e.day}`),
            i = l.map(e => `${+e.year}-${+e.month}-${+e.day}`);
          r.forEach(e => {
            const t = `${+e.year}-${+e.month}-${+e.day}`;
            f.includes(t) && (e.choosed = !0),
              i.includes(t) && (e.disable = !0);
            const a = d.newDate(e.year, e.month, e.day).getTime(),
              {
                showLunar: n,
                disablePastDay: s,
                disableLaterDay: r
              } = this.getCalendarConfig();
            n && (e.lunar = o.default.solar2lunar(+e.year, +e.month, +e.day));
            let l = !1;
            s
              ? (l = s && a - c < 0 && !e.disable)
              : r && (l = r && a - c > 0 && !e.disable),
              (l || this.__isDisable(a)) &&
                ((e.disable = !0), (e.choosed = !1));
          }),
            this.setData(
              { 'calendar.days': r, 'calendar.selectedDay': b || [] },
              () => {
                n();
              }
            );
        });
      }
      __isDisable(e) {
        const {
          enableArea: t = [],
          enableDays: a = [],
          enableAreaTimestamp: n = []
        } = this.getData('calendar');
        let s = !1,
          r = (0, c.converEnableDaysToTimestamp)(a);
        return (
          t.length && (r = (0, c.delRepeatedEnableDay)(a, t)),
          n.length
            ? (+n[0] > +e || +e > +n[1]) && !r.includes(+e) && (s = !0)
            : r.length && !r.includes(+e) && (s = !0),
          s
        );
      }
    }
    t.default = e => new b(e);
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
    var n,
      s = (n = a(1)) && n.__esModule ? n : { default: n },
      r = a(0);
    const o = new r.Logger();
    class c extends s.default {
      constructor(e) {
        super(e), (this.Component = e);
      }
      setTodoLabels(e) {
        e && (this.Component.todoConfig = e);
        const t = this.getData('calendar');
        if (!t || !t.days) return o.warn('请等待日历初始化完成后再调用该方法');
        const a = [...t.days],
          { curYear: n, curMonth: s } = t,
          {
            circle: c,
            dotColor: l = '',
            pos: d = 'bottom',
            showLabelAlways: b,
            days: f = []
          } = e || this.Component.todoConfig || {},
          { todoLabels: i = [], todoLabelPos: h, todoLabelColor: u } = t,
          y = this.getTodoLabels({ year: n, month: s });
        let m = f.filter(e => +e.year == +n && +e.month == +s);
        this.Component.weekMode && (m = f);
        const D = y.concat(m);
        for (let e of D) {
          let t;
          (t = this.Component.weekMode
            ? a.find(
                t =>
                  +e.year == +t.year && +e.month == +t.month && +e.day == +t.day
              )
            : a[e.day - 1]) &&
            ((t.showTodoLabel = !!b || !t.choosed),
            t.showTodoLabel && e.todoText && (t.todoText = e.todoText));
        }
        const g = {
          'calendar.days': a,
          'calendar.todoLabels': (0, r.uniqueArrayByDate)(f.concat(i))
        };
        c ||
          (d && d !== h && (g['calendar.todoLabelPos'] = d),
          l && l !== u && (g['calendar.todoLabelColor'] = l)),
          (g['calendar.todoLabelCircle'] = c || !1),
          (g['calendar.showLabelAlways'] = b || !1),
          this.setData(g);
      }
      deleteTodoLabels(e) {
        if (!(e instanceof Array && e.length)) return;
        const t = this.filterTodos(e),
          { days: a, curYear: n, curMonth: s } = this.getData('calendar'),
          r = t.filter(e => n === +e.year && s === +e.month);
        a.forEach(e => {
          e.showTodoLabel = !1;
        }),
          r.forEach(e => {
            a[e.day - 1].showTodoLabel = !a[e.day - 1].choosed;
          }),
          this.setData({ 'calendar.days': a, 'calendar.todoLabels': t });
      }
      clearTodoLabels() {
        const { days: e = [] } = this.getData('calendar'),
          t = [].concat(e);
        t.forEach(e => {
          e.showTodoLabel = !1;
        }),
          this.setData({ 'calendar.days': t, 'calendar.todoLabels': [] });
      }
      getTodoLabels(e) {
        const { todoLabels: t = [] } = this.getData('calendar');
        if (e) {
          const { year: a, month: n } = e;
          return t.filter(e => +e.year == +a && +e.month == +n);
        }
        return t;
      }
      filterTodos(e) {
        const t = this.getData('calendar.todoLabels') || [],
          a = e.map(e => `${e.year}-${e.month}-${e.day}`);
        return t.filter(e => !a.includes(`${e.year}-${e.month}-${e.day}`));
      }
      showTodoLabels(e, t, a) {
        e.forEach(e => {
          if (this.Component.weekMode)
            t.forEach((n, s) => {
              if (+n.day == +e.day) {
                const n = t[s];
                (n.hasTodo = !0),
                  (n.todoText = e.todoText),
                  a &&
                    a.length &&
                    +a[0].day == +e.day &&
                    (n.showTodoLabel = !0);
              }
            });
          else {
            const n = t[e.day - 1];
            if (!n) return;
            (n.hasTodo = !0),
              (n.todoText = e.todoText),
              a &&
                a.length &&
                +a[0].day == +e.day &&
                (t[a[0].day - 1].showTodoLabel = !0);
          }
        });
      }
    }
    t.default = e => new c(e);
  },
  function(e, t, a) {
    'use strict';
    var n,
      s = (n = a(5)) && n.__esModule ? n : { default: n },
      r = a(0),
      o = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var a in e)
            if (Object.prototype.hasOwnProperty.call(e, a)) {
              var n =
                Object.defineProperty && Object.getOwnPropertyDescriptor
                  ? Object.getOwnPropertyDescriptor(e, a)
                  : {};
              n.get || n.set ? Object.defineProperty(t, a, n) : (t[a] = e[a]);
            }
        return (t.default = e), t;
      })(a(9));
    const c = new r.Slide(),
      l = new r.Logger();
    Component({
      options: { styleIsolation: 'apply-shared', multipleSlots: !0 },
      properties: { calendarConfig: { type: Object, value: {} } },
      data: {
        handleMap: {
          prev_year: 'chooseYear',
          prev_month: 'chooseMonth',
          next_month: 'chooseMonth',
          next_year: 'chooseYear'
        }
      },
      lifetimes: {
        attached: function() {
          this.initComp();
        }
      },
      attached: function() {
        this.initComp();
      },
      methods: {
        initComp() {
          const e = this.properties.calendarConfig || {};
          this.setConfig(e), (0, o.default)(this, e);
        },
        setConfig(e) {
          e.markToday &&
            'string' == typeof e.markToday &&
            (e.highlightToday = !0),
            (e.theme = e.theme || 'default'),
            this.setData({ calendarConfig: e });
        },
        chooseDate(e) {
          const { type: t } = e.currentTarget.dataset;
          t && this[this.data.handleMap[t]](t);
        },
        chooseYear(e) {
          const { curYear: t, curMonth: a } = this.data.calendar;
          if (!t || !a) return l.warn('异常：未获取到当前年月');
          if (this.weekMode) return console.warn('周视图下不支持点击切换年月');
          let n = +t,
            s = +a;
          'prev_year' === e ? (n -= 1) : 'next_year' === e && (n += 1),
            this.render(t, a, n, s);
        },
        chooseMonth(e) {
          const { curYear: t, curMonth: a } = this.data.calendar;
          if (!t || !a) return l.warn('异常：未获取到当前年月');
          if (this.weekMode) return console.warn('周视图下不支持点击切换年月');
          let n = +t,
            s = +a;
          'prev_month' === e
            ? (s -= 1) < 1 && ((n -= 1), (s = 12))
            : 'next_month' === e && (s += 1) > 12 && ((n += 1), (s = 1)),
            this.render(t, a, n, s);
        },
        render(e, t, a, n) {
          o.whenChangeDate.call(this, {
            curYear: e,
            curMonth: t,
            newYear: a,
            newMonth: n
          }),
            this.setData({ 'calendar.curYear': a, 'calendar.curMonth': n }),
            o.renderCalendar.call(this, a, n);
        },
        tapDayItem(e) {
          const { idx: t, disable: a } = e.currentTarget.dataset;
          if (a) return;
          const n = this.config || {},
            { multi: s } = n;
          s
            ? o.whenMulitSelect.call(this, t)
            : o.whenSingleSelect.call(this, t);
        },
        doubleClickToToday() {
          if (!this.config.multi && !this.weekMode)
            if (
              (void 0 === this.count ? (this.count = 1) : (this.count += 1),
              this.lastClick)
            ) {
              new Date().getTime() - this.lastClick < 500 &&
                this.count >= 2 &&
                o.jump.call(this),
                (this.count = void 0),
                (this.lastClick = void 0);
            } else this.lastClick = new Date().getTime();
        },
        calendarTouchstart(e) {
          const t = e.touches[0],
            a = t.clientX,
            n = t.clientY;
          (this.slideLock = !0),
            this.setData({ 'gesture.startX': a, 'gesture.startY': n });
        },
        calendarTouchmove(e) {
          const { gesture: t } = this.data,
            { preventSwipe: a } = this.properties.calendarConfig;
          if (this.slideLock && !a) {
            if (c.isLeft(t, e.touches[0])) {
              if (
                (this.setData({ 'calendar.leftSwipe': 1 }),
                (this.currentYM = (0, o.getCurrentYM)()),
                this.weekMode)
              )
                return (
                  (this.slideLock = !1),
                  (this.currentDates = (0, o.getCalendarDates)()),
                  (0, s.default)(this).calculateNextWeekDays(),
                  this.onSwipeCalendar('next_week'),
                  void this.onWeekChange('next_week')
                );
              this.chooseMonth('next_month'),
                this.onSwipeCalendar('next_month'),
                (this.slideLock = !1);
            }
            if (c.isRight(t, e.touches[0])) {
              if (
                (this.setData({ 'calendar.rightSwipe': 1 }),
                (this.currentYM = (0, o.getCurrentYM)()),
                this.weekMode)
              )
                return (
                  (this.slideLock = !1),
                  (this.currentDates = (0, o.getCalendarDates)()),
                  (0, s.default)(this).calculatePrevWeekDays(),
                  this.onSwipeCalendar('prev_week'),
                  void this.onWeekChange('prev_week')
                );
              this.chooseMonth('prev_month'),
                this.onSwipeCalendar('prev_month'),
                (this.slideLock = !1);
            }
          }
        },
        calendarTouchend(e) {
          this.setData({ 'calendar.leftSwipe': 0, 'calendar.rightSwipe': 0 });
        },
        onSwipeCalendar(e) {
          this.triggerEvent('onSwipe', {
            directionType: e,
            currentYM: this.currentYM
          });
        },
        onWeekChange(e) {
          this.triggerEvent('whenChangeWeek', {
            current: {
              currentYM: this.currentYM,
              dates: [...this.currentDates]
            },
            next: {
              currentYM: (0, o.getCurrentYM)(),
              dates: (0, o.getCalendarDates)()
            },
            directionType: e
          }),
            (this.currentDates = null),
            (this.currentYM = null);
        }
      }
    });
  },
  function(e, t, a) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.getCurrentYM = L),
      (t.getSelectedDay = S),
      (t.cancelAllSelectedDay = v),
      (t.jump = W),
      (t.setTodoLabels = $),
      (t.deleteTodoLabels = Y),
      (t.clearTodoLabels = O),
      (t.getTodoLabels = x),
      (t.disableDay = A),
      (t.enableArea = E),
      (t.enableDays = I),
      (t.setSelectedDays = P),
      (t.getCalendarConfig = j),
      (t.setCalendarConfig = G),
      (t.getCalendarDates = U),
      (t.setDateStyle = F),
      (t.switchView = R),
      (t.default = t.calculateNextWeekDays = t.calculatePrevWeekDays = t.whenMulitSelect = t.whenSingleSelect = t.renderCalendar = t.whenChangeDate = void 0);
    var n = f(a(2)),
      s = f(a(5)),
      r = f(a(7)),
      o = f(a(1)),
      c = f(a(6)),
      l = f(a(3)),
      d = f(a(4)),
      b = a(0);
    function f(e) {
      return e && e.__esModule ? e : { default: e };
    }
    let i = {},
      h = new b.Logger(),
      u = new b.GetDate(),
      y = null;
    function m(e) {
      e && (i = (0, b.getComponent)(e));
    }
    function D(e, t) {
      return m(t), (y = new o.default(i)).getData(e);
    }
    function g(e, t = () => {}) {
      return new o.default(i).setData(e, t);
    }
    const p = {
        renderCalendar(e, t, a) {
          return (
            (0, b.isComponent)(this) && (i = this),
            new Promise((n, s) => {
              (0, c.default)(i)
                .renderCalendar(e, t, a)
                .then((e = {}) => {
                  e.firstRender &&
                    (!(function(e) {
                      e.calendar = {
                        jump: W,
                        switchView: R,
                        disableDay: A,
                        enableArea: E,
                        enableDays: I,
                        getCurrentYM: L,
                        getSelectedDay: S,
                        cancelAllSelectedDay: v,
                        setDateStyle: F,
                        setTodoLabels: $,
                        getTodoLabels: x,
                        deleteTodoLabels: Y,
                        clearTodoLabels: O,
                        setSelectedDays: P,
                        getCalendarConfig: j,
                        setCalendarConfig: G,
                        getCalendarDates: U
                      };
                    })((0, b.getCurrentPage)()),
                    i.triggerEvent('afterCalendarRender', i),
                    (i.firstRender = !0),
                    (b.initialTasks.flag = 'finished'),
                    b.initialTasks.tasks.length &&
                      b.initialTasks.tasks.shift()(),
                    n());
                });
            })
          );
        },
        whenChangeDate({ curYear: e, curMonth: t, newYear: a, newMonth: n }) {
          i.triggerEvent('whenChangeMonth', {
            current: { year: e, month: t },
            next: { year: a, month: n }
          });
        },
        whenMulitSelect(e) {
          (0, b.isComponent)(this) && (i = this);
          const { calendar: t = {} } = D(),
            { days: a, todoLabels: n } = t,
            s = (0, l.default)(i).getCalendarConfig();
          let { selectedDay: r = [] } = t;
          const o = a[e];
          if (o) {
            if (((o.choosed = !o.choosed), o.choosed)) {
              o.cancel = !1;
              const { showLabelAlways: e } = D('calendar');
              e && o.showTodoLabel
                ? (o.showTodoLabel = !0)
                : (o.showTodoLabel = !1),
                s.takeoverTap || r.push(o);
            } else {
              o.cancel = !0;
              const e = `${o.year}-${o.month}-${o.day}`;
              (r = r.filter(t => e !== `${t.year}-${t.month}-${t.day}`)),
                n &&
                  n.forEach(t => {
                    e === `${t.year}-${t.month}-${t.day}` &&
                      (o.showTodoLabel = !0);
                  });
            }
            if (s.takeoverTap) return i.triggerEvent('onTapDay', o);
            g({ 'calendar.days': a, 'calendar.selectedDay': r }),
              p.afterTapDay(o, r);
          }
        },
        whenSingleSelect(e) {
          (0, b.isComponent)(this) && (i = this);
          const { calendar: t = {} } = D(),
            { days: a, selectedDay: n = [], todoLabels: s } = t;
          let o = [];
          const c = a[e];
          if (!c) return;
          const d = (n[0] || {}).day,
            f = (d && a[d - 1]) || {},
            { month: h, year: u } = a[0] || {},
            y = (0, l.default)(i).getCalendarConfig();
          if (y.takeoverTap) return i.triggerEvent('onTapDay', c);
          if ((p.afterTapDay(c), !y.inverse && f.day === c.day)) return;
          i.weekMode &&
            a.forEach((e, t) => {
              e.day === d && (a[t].choosed = !1);
            }),
            s && (o = s.filter(e => +e.year === u && +e.month === h)),
            (0, r.default)(i).showTodoLabels(o, a, n);
          const m = { 'calendar.days': a };
          f.day !== c.day
            ? ((f.choosed = !1),
              (c.choosed = !0),
              (t.showLabelAlways && c.showTodoLabel) || (c.showTodoLabel = !1),
              (m['calendar.selectedDay'] = [c]))
            : y.inverse &&
              ((c.choosed = !c.choosed),
              c.choosed &&
                (c.showTodoLabel && t.showLabelAlways
                  ? (c.showTodoLabel = !0)
                  : (c.showTodoLabel = !1)),
              (m['calendar.selectedDay'] = [])),
            g(m);
        },
        afterTapDay(e, t) {
          const a = (0, l.default)(i).getCalendarConfig(),
            { multi: n } = a;
          n
            ? i.triggerEvent('afterTapDay', {
                currentSelected: e,
                selectedDays: t
              })
            : i.triggerEvent('afterTapDay', e);
        },
        jumpToToday() {
          const { year: e, month: t, date: a } = u.todayDate(),
            n = u.todayTimestamp();
          g({
            'calendar.curYear': e,
            'calendar.curMonth': t,
            'calendar.selectedDay': [
              {
                year: e,
                day: a,
                month: t,
                choosed: !0,
                lunar: (0, l.default)(i).getCalendarConfig().showLunar
                  ? d.default.solar2lunar(e, t, a)
                  : null
              }
            ],
            'calendar.todayTimestamp': n
          }),
            p.renderCalendar(e, t, a);
        }
      },
      w = p.whenChangeDate;
    t.whenChangeDate = w;
    const C = p.renderCalendar;
    t.renderCalendar = C;
    const T = p.whenSingleSelect;
    t.whenSingleSelect = T;
    const M = p.whenMulitSelect;
    t.whenMulitSelect = M;
    const k = p.calculatePrevWeekDays;
    t.calculatePrevWeekDays = k;
    const _ = p.calculateNextWeekDays;
    function L(e) {
      return (
        m(e), { year: D('calendar.curYear'), month: D('calendar.curMonth') }
      );
    }
    function S(e) {
      return m(e), D('calendar.selectedDay');
    }
    function v(e) {
      m(e);
      const t = [...D('calendar.days')];
      t.map(e => {
        e.choosed = !1;
      }),
        g({ 'calendar.days': t, 'calendar.selectedDay': [] });
    }
    function W(e, t, a, n) {
      m(n);
      const { selectedDay: r = [], weekMode: o } = D('calendar') || {},
        { year: c, month: l, day: d } = r[0] || {};
      if (+c != +e || +l != +t || +d != +a) {
        if (o) return (0, s.default)(i).jump({ year: e, month: t, day: a });
        if (e && t) {
          if ('number' != typeof +e || 'number' != typeof +t)
            return h.warn('jump 函数年月日参数必须为数字');
          const n = u.todayTimestamp();
          g(
            {
              'calendar.curYear': e,
              'calendar.curMonth': t,
              'calendar.todayTimestamp': n
            },
            () => {
              if ('number' == typeof +a) return p.renderCalendar(e, t, a);
              p.renderCalendar(e, t);
            }
          );
        } else p.jumpToToday();
      }
    }
    function $(e, t) {
      m(t), (0, r.default)(i).setTodoLabels(e);
    }
    function Y(e, t) {
      m(t), (0, r.default)(i).deleteTodoLabels(e);
    }
    function O(e) {
      m(e), (0, r.default)(i).clearTodoLabels();
    }
    function x(e) {
      return m(e), (0, r.default)(i).getTodoLabels();
    }
    function A(e = [], t) {
      m(t), (0, n.default)(i).disableDays(e);
    }
    function E(e = [], t) {
      m(t), (0, n.default)(i).enableArea(e);
    }
    function I(e = [], t) {
      m(t), (0, n.default)(i).enableDays(e);
    }
    function P(e, t) {
      m(t), (0, n.default)(i).setSelectedDays(e);
    }
    function j(e) {
      m(e), (0, l.default)(i).getCalendarConfig();
    }
    function G(e, t, a) {
      m(a), (0, l.default)(i).setCalendarConfig(e, t);
    }
    function U(e) {
      return m(e), D('calendar.days', e);
    }
    function F(e, t) {
      e && (m(t), (0, n.default)(i).setDateStyle(e));
    }
    function R(...e) {
      return new Promise((t, a) => {
        const n = e[0];
        if (!e[1])
          return (0, s.default)(i)
            .switchWeek(n)
            .then(t)
            .catch(a);
        'string' == typeof e[1]
          ? (m(e[1]),
            (0, s.default)(i)
              .switchWeek(n, e[2])
              .then(t)
              .catch(a))
          : 'object' == typeof e[1] &&
            ('string' == typeof e[2] && m(e[1]),
            (0, s.default)(i)
              .switchWeek(n, e[1])
              .then(t)
              .catch(a));
      });
    }
    function N(e, t) {
      (b.initialTasks.flag = 'process'),
        ((i = e).config = t),
        (function(e) {
          let t = ['日', '一', '二', '三', '四', '五', '六'];
          'Mon' === e && (t = ['一', '二', '三', '四', '五', '六', '日']),
            g({ 'calendar.weeksCh': t });
        })(t.firstDayOfWeek),
        (function(e) {
          if (e && 'string' == typeof e) {
            const t = e.split('-');
            if (t.length < 3)
              return h.warn('配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02');
            W(+t[0], +t[1], +t[2]);
          } else e || (i.config.noDefault = !0), W();
        })(t.defaultDay),
        h.tips(
          '使用中若遇问题请反馈至 https://github.com/treadpit/wx_calendar/issues ✍️'
        );
    }
    t.calculateNextWeekDays = _;
    t.default = (e, t = {}) => {
      if ('process' === b.initialTasks.flag)
        return b.initialTasks.tasks.push(function() {
          N(e, t);
        });
      N(e, t);
    };
  }
]);
