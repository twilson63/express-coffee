
require.paths.unshift('lib')
require('ext')
Object.merge(global, require('sys'))
Object.merge(global, require('ext'))

p((5).hours)
// => 180000

p((2).ordinalize)
// => '2nd'

p('user name'.camelcase)
// => 'UserName'

p('foo bar'.md5)
// => '327b6f07435811239bc47e1544353273'

p('foo bar'.base64Encode)
// => 'Zm9vIGJhcg=='

p('Zm9vIGJhcg=='.base64Decode)
// => 'foo bar'

p((10000000.99).currency)
// => '10,000,000.99'

printf('%10s made $%C on the %D\n', 'tj', 30000, 14)
printf('%10s made $%C on the %D\n', 'scott', 2000, 3)
/*
        tj made $30,000.00 on the 14th
     scott made $2,000.00 on the 3rd
*/

p(sprintf('#%X%X%X', 255, 255, 0))
// => '#FFFF00'

p((new Date('May 25, 1987')).format('%Y-%m-%d'))
// => '1987-05-25'

p((new Date('May 25, 1987')).format('took place on %A the %nd'))
// => 'took place on Monday the 25th'

