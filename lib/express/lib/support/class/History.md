
0.3.0 / 2010-04-08
==================

  * Added extended() hook support,
    passing the subclass to Class.extended() when Class#extend() is called
  
  * Added included() hook support
    passing the superclass to the mixin object when Class#include() is called
    
0.2.0 / 2010-03-16
==================

  * Added Class#include()

0.1.1 / 2010-03-12
==================

  * Fixed; subclass constructor defaults to calling the previous constructor
  * Fixed proto chain so that 'superuser instanceof SuperUser' and 'superuser instanceof User' are true

0.1.0 / 2010-03-11
==================

  * Added support for singleton props/methods
  * Added benchmarks
  * Added seed.yml

0.0.1 / 2010-03-11
------------------

* Initial release
