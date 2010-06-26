
describe 'Date'
  describe '#monthName'
    it 'should return a month name'
      (new Date('May 5 1987')).monthName.should.eql 'May'
    end
  end

  describe '#shortMonthName'
    it 'should return a short month name'
      (new Date('January 5 1987')).shortMonthName.should.eql 'Jan'
    end
  end

  describe '#dayName'
    it 'should return a day name'
      (new Date('May 5 1987')).dayName.should.eql 'Tuesday'
    end
  end

  describe '#shortDayName'
    it 'should return a short day name'
      (new Date('May 5 1987')).shortDayName.should.eql 'Tue'
    end
  end

  describe '#format'
    describe '%'
      it 'should be a literal'
        (new Date('May 5 1987')).format('%').should.eql '%'
      end
    end

    describe 'flag'
      describe 'n'
        it 'should ordinalize a numeric value'
          (new Date('May 5 1987')).format('%ne').should.eql '5th'
        end
      end
    end
    
    describe '%l'
      it 'should represent hours with a 12-hour clock, and no leading zero'
        (new Date('May 5 1987 11:00:05 am')).format('%l').should.eql '11'
        (new Date('May 5 1987 3:00:05 pm')).format('%l').should.eql '3'
        (new Date('May 5 1987 3:00:05 am')).format('%l').should.eql '3'
      end
    end

    describe '%a'
      it 'should represent a short day name'
        (new Date('May 5 1987')).format('day: %a').should.eql 'day: Tue'
      end
    end

    describe '%A'
      it 'should represent a full day name'
        (new Date('May 5 1987')).format('day: %A').should.eql 'day: Tuesday'
      end
    end

    describe '%b'
      it 'should represent a short month name'
        (new Date('January 5 1987')).format('month: %b').should.eql 'month: Jan'
      end
    end

    describe '%B'
      it 'should represent a full month name'
        (new Date('January 5 1987')).format('month: %B').should.eql 'month: January'
      end
    end

    describe '%d'
      it 'should represent a day of the month with leading zero'
        (new Date('January 5 1987')).format('day: %d').should.eql 'day: 05'
        (new Date('January 15 1987')).format('day: %d').should.eql 'day: 15'
      end
    end

    describe '%e'
      it 'should represent a day of the month without leading zero'
        (new Date('January 5 1987')).format('day: %e').should.eql 'day: 5'
      end
    end

    describe '%p'
      it 'should represent AM / PM'
        (new Date('January 5 1987 12:00 am')).format('%p').should.eql 'AM'
        (new Date('January 5 1987 12:00 pm')).format('%p').should.eql 'PM'
      end
    end

    describe '%P'
      it 'should represent am / pm'
        (new Date('January 5 1987 12:00 am')).format('%P').should.eql 'am'
        (new Date('January 5 1987 12:00 pm')).format('%P').should.eql 'pm'
      end
    end

    describe '%S'
      it 'should represent seconds with leading zero'
        (new Date('January 5 1987 12:00:05 am')).format('%S').should.eql '05'
        (new Date('January 5 1987 12:00:12 am')).format('%S').should.eql '12'
      end
    end

    describe '%m'
      it 'should represent month with leading zero'
        (new Date('February 5 1987 12:00:05 am')).format('%m').should.eql '02'
        (new Date('December 5 1987 12:00:12 am')).format('%m').should.eql '12'
      end
    end

    describe '%M'
      it 'should represent minute with leading zero'
        (new Date('February 5 1987 12:02:05 am')).format('%M').should.eql '02'
        (new Date('December 5 1987 12:34:12 am')).format('%M').should.eql '34'
      end
    end

    describe '%H'
      it 'should represent 24 hour clock with leading zero'
        (new Date('February 5 1987 0:02:05 am')).format('%H').should.eql '00'
        (new Date('February 5 1987 2:02:05 am')).format('%H').should.eql '02'
        (new Date('December 5 1987 1:34:12 pm')).format('%H').should.eql '13'
      end
    end

    describe '%Y'
      it 'should represent the year with century'
        (new Date('February 5 1987')).format('%Y').should.eql '1987'
      end
    end

    describe 'given multiple'
      it 'should substitute globally'
        (new Date('December 5 1987 1:34:12 pm')).format('%B %ne').should.eql 'December 5th'
      end
    end
  end

  describe '#inWordsSince()'
    describe 'when seconds ago'
      it 'should return "less than one minute"'
        (5).seconds.ago.inWordsSince(new Date).should.eql 'less than one minute'
      end
    end

    describe 'when 60 seconds ago'
      it 'should return "one minute"'
        (1).minute.ago.inWordsSince(new Date).should.eql 'one minute'
      end
    end

    describe 'when minutes ago'
      it 'should return "n minutes"'
        (3).minutes.ago.inWordsSince(new Date).should.eql '3 minutes'
      end
    end

    describe 'when one hour ago'
      it 'should return "one hour"'
        (1).hour.ago.inWordsSince(new Date).should.eql 'one hour'
      end
    end

    describe 'when hours ago'
      it 'should return "n hours"'
        (12).hours.ago.inWordsSince(new Date).should.eql '12 hours'
      end
    end

    describe 'when one day ago'
      it 'should return "one day"'
        (1).day.ago.inWordsSince(new Date).should.eql 'one day'
      end
    end

    describe 'when days ago'
      it 'should return "n days"'
        (6).days.ago.inWordsSince(new Date).should.eql '6 days'
      end
    end

    describe 'when one week ago'
      it 'should return "one week"'
        (1).week.ago.inWordsSince(new Date).should.eql 'one week'
      end
    end

    describe 'when weeks ago'
      it 'should return "n weeks"'
        (3).weeks.ago.inWordsSince(new Date).should.eql '3 weeks'
      end
    end

    describe 'when one month ago'
      it 'should return "one month"'
        (1).month.ago.inWordsSince(new Date).should.eql 'one month'
      end
    end

    describe 'when months ago'
      it 'should return "n months"'
        (4).months.ago.inWordsSince(new Date).should.eql '4 months'
      end
    end

    describe 'when one year ago'
      it 'should return "one year"'
        (1).year.ago.inWordsSince(new Date).should.eql 'one year'
      end
    end

    describe 'when years ago'
      it 'should return "n years"'
        (6).years.ago.inWordsSince(new Date).should.eql '6 years'
      end
    end

    it 'should work with fractional dates'
      (6.342).years.ago.inWordsSince(new Date).should.eql '6 years'
    end
  end

  describe '#inWordsSinceNow'
    it 'should work like inWordsSince() providing the current date'
      (6).years.ago.inWordsSinceNow.should.eql '6 years'
    end
  end
end

