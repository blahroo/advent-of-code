export const EXAMPLE_INPUT = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`.split("\n");
export const Day22Input =
  `                                                  .##....#..#.#...................#....................................#......#............#......#...
                                                  ..............#.......#.................#.....#..........#........#.#...........................#...
                                                  ........#...........#.......#.............##..#......#.#..............................#...#.......#.
                                                  .................#....#.#...#...#.......#......#....#...............................#.......#.#.....
                                                  ...#..........#.#.............#...........#........#.....#....#...#.......#......#......#...........
                                                  .........#.....#.....#........##...............................#...........................#.##...#.
                                                  ..#.#..#..#.................#....................#.#............##.#..#...#...............#.........
                                                  .........#.....#.#...........................#...........#.#.........#..#.........................#.
                                                  .......#.......................#.....#.##........#.##...#..............................#...........#
                                                  ..#.................#..........#.#...........................................................##.....
                                                  ..#........#..#.......................#...............#..........#.#...................#.........#..
                                                  .......#.......##.............#.................#.........#...................#.........##..#.......
                                                  ....#..........#........#.......................#.................#.......#...#...................#.
                                                  #.....................#......#.#....#.....#....#......##....#........##..#........#.................
                                                  ..#..#......#..................#.............#......#.....##.....#..............#........#.#........
                                                  ........##.#............##.......................#.....#.........#.......#.#.................#......
                                                  ....#..................................#..#..#..........#.................#...#........#....#..#..#.
                                                  ..............#.#..................................#..........#...............#......#......#....#..
                                                  ....#....................#..........#..#.................###...........#.........#..................
                                                  ..#............#................#......###.........#................#............#...#.#.#.......#..
                                                  ....#.....................#........#................................................................
                                                  ............###.#.#.......................#.#.........##..........................#.#.#.............
                                                  ..#....#.........#...................#.............#.#..........#.##......##.#....##.............#..
                                                  ..#..#............#......#..#..............#.#...#....................#......#......................
                                                  .....#...............................#...............................#..........#...................
                                                  .#.................#.#......#........#..........#............#.......#..#...#..................#.#..
                                                  ..#.......#..............#....#...#.............#................................................#..
                                                  .......................#.#.........#......##..................#..##...........#.......#.........#...
                                                  .....................#.........##........#..............#....................#......#.........##...#
                                                  ..#.............#....#...#.#.....#....#.#.......#........#...............#.........................#
                                                  ....#......................................#...............#..................................##....
                                                  ......##..........#..........#.........................##.#.......#...#.#...........................
                                                  ..................#.#........#.#................................................#................#..
                                                  .........#.........#.......###........#...##......................................#.....#...........
                                                  .............#..............##........#...................#..#........#.............................
                                                  ..............##.........#...........#.....#..##....#.............#....#....................#.......
                                                  .#.....#........#................#.........................#.#........#..#...................#......
                                                  .................#......#........#...............#......##........................#.........#.#...#.
                                                  ....#..#......#................................................#......#.....##....#.................
                                                  ....#..#..#..#......#....#.........#............................##.............#....................
                                                  ......#.......#.#..............................#........#...........#.......##......................
                                                  .................#..............#.......###.##..##.................#.........................#......
                                                  ................#..#......#......#.........#.#..............#...#..#....#...##..............#.......
                                                  ....##...........##..................#.#...................#.#..#.........#.........#...#.#.......#.
                                                  #....#.....................#.#...##.....................#.#...........#.........#...#..#............
                                                  ......#......................#......#.....#........#........#...#..#.#...................#....#.....
                                                  ........#.....#............#.....#........#....##..........#........................................
                                                  ........................#......#...#.#..........#..##.......#.........#.......#.....#..............#
                                                  ..##..............#..............##.....#...............##........#.............#..................#
                                                  ......##............#.#.................#.................#..........#........#..........#.....#....
                                                  .................#....................#...........
                                                  .......#......#...#..........#.#..##............#.
                                                  ................#.............#.#..#..............
                                                  .................#.....................#......#..#
                                                  #...#.#......#....##...........#..#...........#...
                                                  .........#.#.#........#.....#..###.#....#.........
                                                  .......#.............#................#...#...#...
                                                  ...........#.............#..#....#.#......#..#....
                                                  ......#.##.....##.................................
                                                  ..........#........................#...#..........
                                                  .............#....#..........#...........#........
                                                  ..#.....#............#....#.......#..........#....
                                                  ........................#.#.............#.........
                                                  #.......###.......##....#...#..#.#.....#.##.......
                                                  ..........................#....................#..
                                                  #................#.....#............##............
                                                  ..#...............#....#.......#...#...#..........
                                                  ......#.##........#...............................
                                                  .................................#.....#..........
                                                  ...............#...............#...........#......
                                                  ...........................#.#..##............#...
                                                  ....#.........#...........#.......#...............
                                                  .....#.......................#..........#.........
                                                  ..............#................#..................
                                                  ...#........#...#.................#..........#....
                                                  ........#........#...#.....................##..#..
                                                  .........#.#......................................
                                                  ...............................#...#.........#....
                                                  ........#..................#.....#......#.......#.
                                                  ...#............................................#.
                                                  ...#.#...........#....#....#............#.........
                                                  .#........#.......................................
                                                  ..#.#.#.#.......#.............#...................
                                                  .....###.....#...........#.#....#.........##......
                                                  ............#........................#............
                                                  ...........##..##....#.........#.#...##.......#...
                                                  ..........#............#..........................
                                                  ..........#...........#..............#.....#......
                                                  #........#.......#.....................#.#....##..
                                                  .#.........#................#.......#.............
                                                  .......#....#..........#..#..............##.......
                                                  .#.....................#.......#.......###.....#..
                                                  ......#..#............#................#.........#
                                                  ..#.#.....#....#.#......#..#...##.................
                                                  .............................#......#.........#...
                                                  .#.............#..#.....................#.........
                                                  ......#..................................#..#....#
                                                  ..#..........#.....................#..............
                                                  ...........#................#.....#...#.#........#
                                                  ....#...#..#...#..................#..........#....
............#........#....#...#..#...#.........................#...............#....................
...............................#.....#..#.................................................#......#..
.............#.....#.......#.....................##.................#.............#....#............
...........#..#..#.#.#........#.....#........................#....#....#.......................#....
........#.##..........#....#.........#...#......................#....#...#.#..........##.....#...#..
..#..............#..........#.........#....#.............................#.................#.......#
#..#..........................#................#...#.####........#.....#............................
.................#................#.........#..........................#......#.....#............#..
.............#....#...............#...#....................#.#....#...#...#.#......#................
.........#.......##...#......#.............#.......#..#...................#..#.#...#.........#..#...
.........#.........#.#..#................#.#...................#.......#.............#.....#........
.................#......................#........###................#........#..........#.........#.
..........#............##..........##.#....#...........##............#...............#..............
.#.#......#.#.....#..#.................#..#.....#..#....#....#..........#.............#.....#.......
........................#...................#.........#......#.......#................#............#
..............##........#.........#...#.........#...#.......#.......#.......#....#....#.............
..............#......##..........................#................#.......#...........#.............
.......#...........#.............#..........#.......#.......#..#.............#................#.....
#...........#.........................#......#...............#........#...#............#.#..........
.......#........#.....##.....#.....#.........#............................#.........................
....................#........#..........#........#..............#........#..........................
...........#.......#.................#...............................#..............................
...............##..........#.....................#.............#...#..........#.....................
........##..........#...###...#....#.##..#....#.............#..#....................................
......#............#............#...........#........##...#........#.........#..#.....#.......#.....
#.#...................#............#......................#............................#..........#.
.#....#.............................#.....#.#..#..........#...#......................##....#....#...
..................#.......................##...#..#............#.........#..#......#...##....#......
.........#.........#.......#.......#............#....................#...#....#.#..#................
.#.......#...................#...##.#...#..........##......#....#......#...........#.........#...###
.......#..........#..............................................##...#....#.....#..................
#........#.........##.#.......#.........#..............#.......................#.........#..........
....................#........................................#...............#..#...#...#...#....#..
.......#.........................#.###...#...##..............#.....#..#.................#...........
....................................#.......#.#.#...#...........#.#.......#..#..#...................
.#...........##.......................................#....#.....#.................#............#...
...............................#..........#.........................................................
...#.................#.#........#..#..#.#.........#..........#...#...................#..............
...................#...#..#....#.#.......#........#.......#...........................#.#.....#..#..
.................#.........#...................#.....#......#...........................#....#......
...#..#.......#..#........#..............#........#.##...#...#...#.........#...........#.....#.#...#
...#.....#.##..........#..............##........#....#...#............................#.............
.................................#....................#..#...#............#....#....#...............
..#.........#.#.#..#.............#......................#...........................................
..#...........................................................................#.......#..#.......#..
.......................#..#...................#..#......#.............#....................#........
...#.........#......#.#........................#.....#.....##...................#.......#.#......#..
..#..#..#.......##.#..........................#.#........#.....#.#..................................
..............................#..................#..#........#......#...#.........................#.
................................#.................#................#........#...................##..
.................#.....#.#..........#.............
#.#.........#..#..#.............###....#.....#....
....#.#..................#........#...........#...
#.............#........#..........................
..............#.....#...........#.......#.........
#.#..............#.........#........#.....##.#...#
..........#................#.#.#...........#......
.....#....................#.......................
......................#......#...#.#........#....#
#....#......#..#....#...............#.............
#............#........................#...........
.................#...............#................
.............#....................................
....##.............#...#..#.....#.............#...
......................#.......................#...
..........#.....#.......#............#.....#...#..
.......#..................#...........#...#..#....
..#...#.................#........#.#..............
................#............#....................
......#.........#..............................#..
..............#.....#...#..................#......
...#...#...#........................#...#.#.......
..........#...........#.............##............
......................................#...........
#...........#.....##..........................#...
.............#..#.......................#......#.#
.#..........#.....#...............................
..#.#..........#..........#....#.....#............
......#..###..........#...............#...........
...........#....................##................
..#.............#.....#.............#..........#..
..#......#.............#.#.........#..............
..........#.....#....#.........#........#.........
#...........#.....................................
......#..#....##...........#..........#..#.....#..
#..#..................#......#.#............#.....
...........#.#..#......##..............#..........
#..##...##........#.....#..........#..............
.#.#.......#..#......#.#.#.#............#.........
..#..#.......#..##....#....#.....#.#......#..##...
..#..#.........................#..................
.....##....#....................#............#....
........#................#........##..............
..........#.....#.................................
...........#.......#..#...#.....#.............#...
.....#.......#.......#...#.............#.#...#....
...#...................#.......#...#......#.......
........#...........#.............................
...........#....#.#......................#..#.....
.....##...................................#.#.#..#

13L2R45R31R34R41L14L26L47R28L44R6L20R49R15R9R41R39L28R24R24L21R14L35L44L48L8L6L34L6L3R6R26R18R28R30L14L10R9L49L22R43L23L23L7L46R33L31R18L9R48R12L9L6R43R43L38R20R49R46R1L33R18R49L5R16R3L1L44L38L44L37R7L43L41L46R50R24R28R7L1R32L29R21R40L36R9L33R27L29R42R24R50R15L11L30R44R43L20R26R15R16L30R30L10L32L28R47R7L22L34R11L24R33L29R29R38R11R40L37R6L14R17R25L40R18R31L50R12R39L47R45R38L22L37R7L47L47R27R26L13R50R21R36L25L4R42R27R4R11R33L14L36L19R49R42R6L17L36R32R38R40R31R17L44R11R37R8L48R10R27L28L13L25L17R3L36R23R9L37R27L36R5L16R24R18R44R3L45R48L24R45L8L6R17R48L45L3R23R10L36R12R15R22L44L24R2L2L35L22R3R46L48R6R14L29R43R37L47L4R9L6L28R45L20R44L35R30R5L50R25L17R11R40R40L42R36R43L4R30R9L35L10L2L38R33L35L15R30L50L15R9L13L19R29R24L8L11L47L44L27R50R49R17L49L30R35R48L32L23R20R3L36L43R42L23R43L39R6L27R44R31L44R12R5R26L18R23R27L17R4L25L49R40L28R43R17R24R5L37L4R37L35L17L20R38L48R16L34R7L31L27L26L23L11L11L46L21L36L7L44L44L21R35R7R33L28L7R42L46R30L27R1L40R17L40L45R4L40L12L28L24R46L22R39R16L37R41L5L10R15R3R3L34L8L10L3L35R27L37L5L38R25R49L41R31R16L49R43R50L39L10L11R5R2L12L2R37L50L28R19L29R40L1L40R29L20L4L44R11L45R33L32R5R14L50R32L27L29R36L15L14L24L36L35R13L2L1L4L10R20L48L9R23R13L19R23L29R15L7R41R21L47R32L12L27R22R14R43R50L26L34R29L28R50L17R19L4R13L16R14L17R49R49R14R41R45L22R41R14L26R25L13L18R4L36L19R33L19R40L43R28R39R43R14L40R24L7L17R30R26R45L20R29L30L42R35R43L40R16L18L25R45L14R15R7R11R5R48R38L38R36L4L6R14R26R31L7L48L39L45R2L41R33L13R2R16R44R42L16L14L49L35R10R22R35R24R11L30R8R16R34R47L21R12R22L26R13L48L45R20R32L23R17L6L40R50L23R50L46R44R7L7R17R7R30L22L18L32R12L36R42L22R12L38L47L45L43R4L27R30L41L3L10L32R4R22L17R17L35L9R29L20L15R21R46L36L31R47L40L9L47R26L6R24R23L25R26L8R14R21R8R41R31L49L35R25R18R15L39L13L12L12L9L17R48L14R30L16L23R22R12L27L10R44L49L22R24L9R24L38L23R45L11R12L39L42L7L11L14L7L50R41L2L35L29R2R40R6L26R5R31L42L33R40R31R18R18R11R18R1L15L14R20R3R14L12R26L2R16R45R18L16L29R14R31R46R24L34L33R50R21L11R44R30L6R40R9L5L23R38L21L13R1L33L12L10L33L45L5R47L19R28R23R7L5R23R21L49R44L48R21R18L8L32L45R8L9R9R3L8R23L33R29R2R38L3L6L4L7R47L20L26R18L30L36R12L45L18L15R36R38R46R4R43L22L21L33L35R44R47R49L43L8R40L9L39R33R37R26L3L43R5R30R7L8L15R49L4L5L50L28L10L9R6L7R27L39R5R26L2R28R4L26R30R10R19L44L30R48L20R32L12R18L31L11L29R36L33R10R47R33L26R40R15R19R4R14R13L45L17L17L39L16L31L39R37R14L5L45L4L13R36R13R6R3L4R25L21L22R24L22L45L46L32R21L29L16L40R5R17R4L44L38R41R25R37R22R45L39L37L23L16R16L2L34R16L42L21R38L28L40R34L37R9R14L5R8L22R18L37R20R24L1L35R3R1R23R13R42L20R29L42R25L5R33R25L48L33R48R13R16R1R14R45R29R43R4R35L47L22R18L49L19L44L40L23L41L5R32L18L20L48R7L32L33R22L46L8R21R17R9L23R22R2R29R18L15R30R47L12R44L1L36R26L19L35L9R8L14L44L42L26L18R35R37R21L24R18L49R34L18L31L4L43L31R18R49L42R50R38R2L1L39L14L50L2L35L33L2R50L30L35R37L34R35R16R9R43R41L41R38L46R5L22R40R20L7L42R3R6L27L38L46R20R28L5R32R33L38L50L12R35R29L5L36R40L13L33R25R46R33L3R45R5L11R30R44R18R38R10R26R22R46R35L22R30R9L33R43R9L19R31L26L39R27R38L46L24R13L13R5L35R48R1R1R47R50L47R20R48L44L7L22R24R35L9L44R45R36L45L47R23R24L23L41L16L22L36R23L45L45L25R2R37L49L6L47L16L9L47R14L5L35L30R34R16R49R19L23L50R34L23R34L1R46L10L41L41L18L37L3L5L19R37R33R24R31R14L19L45R1R23R4L22L37L19R24R38L16L20R1L26L31R41L7L48L31L6R30L22L3L4L38R20R48L37R15R50L14L7L38R11R24L37R36R36R37L47R23L1R5L45L50R1R46L34R32L3L47L16L38L18L45R21L1R2L25L25R23L2L34L29L15R49L33L40L37L13R27R21R36R23L2L45L28L47L48R27R46R15R13R3R28R26L2L48L47R13L5R6L5L9R7L23L21L24R35R43R29R39L21L50L13L33R4R47L3R6L20R31R34R15L44R23R28L21L39R49R44R20R1L4L11L18L2R32R13R24L32R8R15R23R31L23L37L43R18L16R41L14R39R48L14R20R7L20L15L24L13L24L10L20R44L35L32L30L27L10L33L7R34R49L19R12L7L49R12R19R29L39R48L50R17L43L36R34R38L34L13L15L16R3R15L24R2L42R4R50L26L50R5L17R37L49L48L16R35R9R28R29R25L14R33R35L6R18L44R20R27L19R14L20L32L11L46R6R19L44L28L47L38R16R10R6L7R31R6L1L4R25L27L44R38R11R30R7L17R15R49L34L4L30L44R7L10L34R37L12L7L49R42R32R25L1R11L29L30R4R28R40R30R34R40L3R2L29L33L44L45L15L16L13R1L15L8L44R43L10R1R36R7L24L19L40R4R31R50R38L28L9R26R26L45L32L29R48L8L37R41L14R14R10L13R40R21R25L36R21L17R19L39L48L10L31R14R34L43R46L48L49L26R36R41L3L49R26L50R6R42L7L22R26R30L34R21R9R13L32R50R34L13R49L2L50R41R31L36R12L29L35L28L16L47R48L17R5R26R50R18L3L19R24L32R1L50R8L9L7L20L16L36L28L32L10R19R31L7R39R22R36L32L39L40L22L8R25R29R6R14L42R46L24R38R2L49R48R8L44L22L12R36R5L33L10R24L29L34R41L3R49R31R14R49R9R9R27R30L10L31R36R49R35R36L41R48R13L24L14L8L13R27R46R18R36L34L17R36R36L10L26R38L20L44L4R44R33R35R34R18L27L7R11R14L13L41R12R22L30L39R32L32L31L25R46L26R25R47L2R18R32L42R27R12R29R35R22L16R26R14L10R44R6R48R20R5L23L33L27R4L31R28L45L50R47R26L48L8L1L26L27R40L4L39R39R21R23L47L18R18R26L16R32L49L21R27R26R4R3L36L28R4R18R15R33L5L6R35R29L12R49R49R25R31L16R5R34L11R1L32L13R43L9R31L29R3R45L44R36R20L27L26L37R20L43L6L7L3L10L50R15R49R19L30R20R19L2R48L45R48R45L5R48R22R15R19L4L30L11L38L23R39R3L34L1R12L5L6L14R17L5R26L50L29L46R23R9L39L24L41R17L8L20L13R45L36R32R32L3R49R40R50L21R38L43L21L38R42R2R34L8R3L24R43R31L2L34L2L10R4R49L2R13L17R36R10L31L38R49R43R6L17R30R8L23L13L38R6R12R29R48L13L25L32R40L50L47R13R1R46L20L38L29L29L41R16L19R49L28L40L18R37R29L48R6L19R47L14L50L18R7R14L4L16R33L30R38L9L43L24L34R44R36R20L48R7R34L26L49R36L47L7R29R17R35R31R38R28L16L49L15R1R21R36R19L25L29L33R48R8R34L39R13L3R41R41L37L19L4L40L10L46R4R24L45R23R12R25L13L38L43R49L10L34R16R23L35L3L16L1L33L33L39R4L45L25L44R25L37R24L47L10R45R3R45L12L8R11R10L49R27L36R40R39R28L16R41R47L7R29R26L3R49R7L25R7R4L47R47L12L41L46L16L16L36R18R26L19R46R46R41R4L36R44L26R34L23L10L4R35R28L49R18L4L15R37R17L2L43L40R9R1L39R29R12L30L38R45R21R18R48L5L44R40L19R23L9L33R8L4R18L50R23L29R32L21R41R28L13L34R13R19L34L9L23R46R24L3R24R45R28R14L7L49R12L49L9R39R25R37R25L29L3R31R8L33R6L41L24L1L20R38L45R26L13R40L16L31R45L12L2R18R45L17L15L49L25R8L23R1L38`.split(
    "\n"
  );
