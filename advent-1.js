// --- Day 1: Sonar Sweep ---

// You're minding your own business on a ship at sea when the overboard alarm goes off! You rush to see if you can help. Apparently, one of the Elves tripped and accidentally sent the sleigh keys flying into the ocean!

// Before you know it, you're inside a submarine the Elves keep ready for situations like this. It's covered in Christmas lights (because of course it is), and it even has an experimental antenna that should be able to track the keys if you can boost its signal strength high enough; there's a little meter that indicates the antenna's signal strength by displaying 0-50 stars.

// Your instincts tell you that in order to save Christmas, you'll need to get all fifty stars by December 25th.

// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

// As the submarine drops below the surface of the ocean, it automatically performs a sonar sweep of the nearby sea floor. On a small screen, the sonar sweep report (your puzzle input) appears: each line is a measurement of the sea floor depth as the sweep looks further and further away from the submarine.

// For example, suppose you had the following report:

// 199
// 200
// 208
// 210
// 200
// 207
// 240
// 269
// 260
// 263

// This report indicates that, scanning outward from the submarine, the sonar sweep found depths of 199, 200, 208, 210, and so on.

// The first order of business is to figure out how quickly the depth increases, just so you know what you're dealing with - you never know if the keys will get carried into deeper water by an ocean current or a fish or something.

// To do this, count the number of times a depth measurement increases from the previous measurement. (There is no measurement before the first measurement.) In the example above, the changes are as follows:

// 199 (N/A - no previous measurement)
// 200 (increased)
// 208 (increased)
// 210 (increased)
// 200 (decreased)
// 207 (increased)
// 240 (increased)
// 269 (increased)
// 260 (decreased)
// 263 (increased)

// In this example, there are 7 measurements that are larger than the previous measurement.

// How many measurements are larger than the previous measurement?
puzzleInput = `130
142
148
147
157
160
162
160
165
164
171
169
160
165
167
195
197
193
192
188
192
190
189
193
215
214
191
189
191
199
188
191
196
200
215
175
176
187
178
169
172
168
181
180
163
173
206
192
175
177
180
186
216
220
212
211
213
215
208
207
208
206
204
201
196
191
192
213
211
217
213
225
232
237
236
241
249
250
244
243
256
260
253
252
278
275
279
293
292
290
302
300
297
296
306
302
292
298
297
301
302
305
312
310
305
306
313
331
332
330
335
333
329
328
345
347
346
334
331
332
333
336
338
344
342
348
357
360
366
368
367
357
358
355
356
360
364
374
366
371
346
333
332
333
350
351
350
351
360
364
365
355
380
381
386
381
384
386
388
390
416
415
440
438
436
438
439
440
443
448
460
459
455
453
445
447
444
439
446
457
454
455
451
450
449
450
454
456
450
449
471
474
476
480
479
486
493
495
505
504
514
515
519
521
516
506
507
525
541
529
528
549
556
560
578
584
592
591
593
583
552
536
531
532
538
536
542
541
545
549
563
565
567
573
572
570
569
570
550
545
561
553
554
536
537
538
539
540
543
576
575
578
570
581
584
585
590
588
590
595
590
592
590
587
588
594
590
592
584
589
600
602
606
607
606
607
608
623
621
623
632
637
633
630
631
622
619
627
619
585
573
574
578
574
573
574
579
581
595
596
617
626
628
613
618
623
612
602
601
605
586
594
604
606
608
609
606
607
615
578
587
592
597
598
594
555
549
550
549
550
549
548
540
532
525
526
538
548
547
548
553
555
560
555
553
557
566
563
564
558
561
566
563
562
559
548
551
543
561
550
569
570
568
569
571
572
571
574
575
577
576
579
580
577
579
572
559
568
569
565
559
560
582
581
573
570
571
555
566
558
548
565
580
589
585
586
585
580
579
573
557
559
558
535
539
537
550
549
586
590
591
592
593
594
595
592
591
593
599
615
611
620
631
632
619
621
623
657
656
655
663
664
669
673
676
677
681
677
680
681
685
683
682
681
680
679
688
686
685
665
684
691
711
718
719
725
719
723
716
711
710
715
717
724
726
725
733
731
734
754
755
760
759
754
755
759
765
756
769
768
764
763
765
774
777
768
778
786
784
792
785
783
788
794
795
776
777
778
777
774
786
785
795
800
799
798
801
815
822
833
839
837
797
799
804
795
827
833
832
824
828
825
832
841
869
867
866
865
861
863
867
834
831
838
844
865
869
866
882
887
906
900
922
914
916
917
914
908
924
934
942
934
936
948
930
925
923
931
934
909
910
909
902
903
907
909
907
908
909
905
900
901
907
908
932
924
916
917
916
913
912
911
910
940
930
929
935
945
942
959
952
953
948
944
962
961
927
942
943
946
958
977
976
973
982
986
992
989
986
995
1010
1023
1018
1019
1015
1002
1005
990
1000
967
970
985
986
988
1034
1039
1034
1031
1028
1029
1030
1033
1014
1004
1006
991
1003
1000
1003
1005
994
996
995
996
1008
1003
1004
1018
1013
1004
999
984
974
975
973
974
978
979
992
994
1000
995
994
1029
1020
1019
1018
1017
1006
1005
1009
977
999
996
978
997
998
999
1020
1017
1018
1019
1017
1026
1027
1031
1032
1035
1040
1038
1045
1048
1052
1038
1041
1040
1039
1040
1039
1040
1027
1031
1036
1059
1047
1050
1038
1036
1039
1044
1047
1040
1057
1049
1050
1053
1051
1045
1036
1035
1032
1045
1034
1026
996
995
993
995
985
984
991
989
990
993
995
986
980
979
986
991
978
986
967
977
969
964
966
959
952
963
960
961
962
943
948
944
957
958
944
937
941
927
918
919
912
925
896
899
898
888
902
903
907
906
888
891
892
891
872
873
888
892
893
914
917
940
938
922
921
920
901
904
901
872
887
893
890
891
909
890
893
884
892
893
903
918
921
927
915
926
927
947
944
956
962
970
982
977
986
968
976
978
980
986
988
981
980
979
983
990
1000
1002
1000
1002
1003
1004
1007
1005
1013
1016
997
996
989
1023
1027
1023
1010
1009
1011
1012
994
993
1009
1022
1024
1037
1050
1059
1056
1055
1054
1055
1054
1053
1047
1044
1046
1044
1057
1059
1061
1060
1063
1056
1054
1053
1059
1056
1051
1055
1056
1050
1049
1054
1070
1079
1082
1081
1082
1084
1081
1087
1103
1077
1078
1054
1056
1057
1065
1067
1068
1069
1086
1072
1055
1060
1092
1095
1096
1111
1115
1111
1116
1140
1154
1155
1150
1162
1140
1108
1111
1112
1142
1128
1161
1166
1159
1202
1203
1204
1198
1199
1205
1244
1245
1271
1275
1268
1275
1273
1272
1300
1316
1313
1326
1331
1339
1342
1344
1349
1339
1344
1345
1352
1356
1353
1356
1345
1354
1356
1357
1367
1368
1362
1363
1376
1389
1391
1374
1373
1349
1348
1350
1347
1348
1347
1338
1340
1341
1340
1344
1370
1373
1371
1372
1375
1391
1380
1369
1371
1370
1360
1342
1343
1340
1339
1335
1317
1310
1315
1320
1346
1349
1318
1331
1309
1336
1345
1350
1349
1347
1350
1347
1346
1347
1374
1373
1351
1348
1345
1349
1363
1365
1364
1367
1371
1404
1407
1408
1410
1403
1410
1418
1417
1416
1417
1423
1427
1424
1419
1410
1412
1413
1381
1382
1379
1382
1385
1382
1383
1381
1384
1393
1407
1400
1397
1390
1389
1367
1375
1373
1372
1373
1377
1381
1384
1387
1384
1406
1412
1414
1390
1392
1390
1365
1363
1365
1370
1371
1373
1363
1366
1379
1380
1377
1375
1370
1386
1383
1380
1400
1401
1427
1428
1401
1405
1407
1398
1399
1427
1429
1454
1455
1459
1458
1452
1440
1430
1431
1424
1417
1416
1421
1424
1422
1430
1434
1446
1467
1468
1477
1478
1481
1475
1462
1463
1464
1454
1447
1425
1440
1429
1417
1431
1423
1438
1412
1441
1437
1448
1449
1464
1458
1450
1449
1456
1446
1455
1456
1447
1448
1442
1440
1425
1424
1431
1465
1462
1466
1465
1447
1442
1447
1423
1420
1421
1419
1430
1419
1416
1418
1421
1415
1420
1417
1418
1416
1415
1419
1425
1431
1434
1435
1438
1441
1429
1427
1428
1427
1435
1438
1430
1424
1425
1415
1412
1415
1405
1403
1404
1402
1399
1405
1406
1414
1425
1429
1433
1393
1414
1430
1435
1438
1423
1424
1425
1427
1428
1429
1426
1427
1428
1431
1428
1430
1433
1421
1420
1414
1421
1423
1415
1416
1420
1424
1435
1422
1408
1401
1405
1418
1412
1398
1399
1433
1430
1431
1430
1431
1429
1425
1446
1447
1434
1426
1433
1434
1432
1445
1443
1452
1451
1443
1441
1415
1416
1439
1456
1460
1454
1460
1477
1479
1460
1488
1474
1457
1459
1463
1468
1465
1463
1467
1479
1472
1475
1474
1475
1476
1477
1481
1475
1481
1480
1478
1448
1476
1475
1476
1461
1485
1484
1485
1478
1477
1476
1479
1475
1456
1458
1465
1458
1464
1461
1477
1502
1482
1483
1484
1485
1495
1493
1511
1513
1518
1530
1521
1525
1528
1530
1531
1533
1559
1560
1566
1574
1573
1557
1563
1569
1561
1559
1556
1560
1574
1575
1578
1580
1579
1576
1600
1603
1567
1574
1573
1569
1574
1583
1582
1581
1577
1582
1587
1583
1576
1579
1578
1584
1585
1600
1590
1582
1574
1570
1578
1575
1572
1583
1584
1569
1566
1559
1534
1526
1542
1539
1544
1546
1539
1540
1541
1566
1569
1570
1573
1567
1570
1571
1574
1583
1579
1585
1584
1581
1598
1603
1607
1609
1611
1612
1615
1616
1623
1627
1638
1637
1644
1645
1646
1647
1646
1653
1651
1652
1666
1663
1668
1666
1660
1665
1661
1677
1690
1691
1692
1701
1702
1703
1714
1710
1715
1714
1713
1723
1707
1708
1724
1728
1748
1759
1760
1758
1757
1758
1760
1764
1773
1753
1750
1751
1758
1769
1766
1751
1742
1728
1733
1732
1740
1742
1743
1769
1750
1761
1762
1764
1765
1761
1765
1769
1778
1779
1777
1778
1759
1740
1741
1742
1740
1741
1740
1739
1744
1758
1757
1785
1788
1798
1793
1799
1780
1804
1807
1813
1815
1804
1813
1818
1819
1806
1807
1808
1807
1808
1810
1824
1840
1847
1840
1838
1841
1815
1826
1832
1825
1813
1809
1826
1835
1834
1830
1831
1841
1838
1819
1824
1815
1808
1812
1811
1812
1813
1793
1792
1794
1787
1779
1770
1761
1759
1768
1769
1768
1767
1766
1765
1766
1779
1775
1771
1765
1767
1772
1770
1775
1776
1783
1773
1767
1771
1775
1778
1781
1803
1802
1803
1804
1791
1794
1774
1762
1764
1793
1792
1798
1796
1801
1809
1818
1820
1822
1818
1804
1803
1821
1822
1820
1822
1815
1816
1809
1810
1833
1845
1815
1824
1823
1806
1808
1813
1804
1805
1797
1798
1800
1791
1790
1789
1783
1785
1786
1790
1780
1786
1814
1815
1816
1818
1807
1785
1789
1790
1780
1791
1792
1793
1794
1813
1800
1795
1809
1810
1813
1791
1793
1792
1790
1792
1795
1816
1835
1851
1856
1855
1856
1869
1868
1872
1876
1872
1866
1865
1868
1871
1860
1862
1860
1862
1863
1876
1884
1890
1893
1892
1891
1892
1891
1893
1900
1901
1915
1926
1921
1928
1905
1906
1894
1890
1884
1885
1880
1883
1887
1882
1881
1882
1885
1884
1883
1889
1897
1902
1906
1911
1893
1898
1897
1885
1891
1892
1882
1903
1906
1911
1905
1885
1886
1880
1884
1860
1868
1876
1877
1870
1877
1895
1896
1897
1900
1905
1910
1902
1894
1895
1892
1897
1893
1890
1891
1883
1884
1867
1866
1857
1839
1835
1836
1833
1846
1849
1860
1861
1858
1856
1857
1870
1858
1862
1881
1882
1883
1887
1865
1864
1854
1855
1858
1871
1869
1856
1857
1862
1868
1870
1868
1873
1854
1850
1849
1848
1849
1858
1861
1862
1868
1866
1878
1879
1878
1879
1887
1886
1891
1886
1888
1890
1889
1885
1921
1929
1923
1925
1922
1923
1922
1926
1936
1948
1943
1945
1946
1948
1947
1956
1963
1979
1985
1987
1974
1976
1966
1968
1936
1929
1927
1921
1938
1919
1920
1909
1908
1920
1910
1892
1895
1908
1911
1916
1922
1923
1938
1941
1937
1952
1955
1966
1960
1961
1983
1953
1960
1961
1959
1917
1918
1911
1915
1939
1941
1938
1917
1928
1930
1924
1922
1921
1925
1924
1923
1927
1913
1926
1945
1954
1944
1918
1922
1914
1915
1916
1917
1882
1873
1857
1856
1852
1858
1860
1874
1864
1865
1867
1872
1880
1879
1887
1890
1874
1875
1877
1895
1917
1909
1941
1963
1969
1971
1988
1989
1985
1986
1979
1985
1986
1988
1997
1994
2000
2002
2005
1999
1996
1995
2014
2009
1994
1983
1995
1994
1998
2001
1996
2015
2003
1998
2012
2013
2000
1997
1999
2003
2006
2008
2011
1992
1989
1988
1989
1976
1978
1998
2003
2001
2004
2001
1983
1984
1983
1985
1986
1983
1981
1980
1993
1998
1991
1998
2019
2010
2009
2035
2032
2031
2022
2019
2020
2022
2021
2018
2019
2020
2029
2028
2030
2033
2038
2031
2037
2075
2064
2048
2049
2061
2060
2061
2059
2061
2068
2088
2097`;
const puzzleInputArray = puzzleInput.split('\n').map(Number);

function partOne () {
    let previous = puzzleInputArray[0];
    let increaseCount = 0;

    for(let i = 1; i < puzzleInputArray.length; i++) {
        if (puzzleInputArray[i] > previous) {
            increaseCount++;
        }
        previous = puzzleInputArray[i]
    }
    console.log("Count for Part One is: ", increaseCount)
}

function partTwo () {
    let increaseCount = 0;
    previous = puzzleInputArray[0];
    for(let i = 3; i < puzzleInputArray.length; i++) {
        if (puzzleInputArray[i] > previous) {
            increaseCount++;
        }
        previous = puzzleInputArray[i-2]
    }
    console.log("Count for Part Two is: ", increaseCount)
}

partOne();
partTwo();