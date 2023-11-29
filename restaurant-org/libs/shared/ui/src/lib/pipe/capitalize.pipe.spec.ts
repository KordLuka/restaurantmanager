import { CapitalizePipe } from './capitalize.pipe';

describe('Capitalize pipe', () => {
  it('should capitalize a provided text', () => {
    // given
    const pipe = new CapitalizePipe();
    const text1 = 'Michael Jordan';
    const text2 = 'MICHAEL JORDAN';
    const text3 = 'Michael 23 JORDAN';
    const text4 = 123 as any as string;
    const text5 = undefined as any as string;
    const text6 = null as any as string;

    // when
    const result1 = pipe.transform(text1);
    const result2 = pipe.transform(text2);
    const result3 = pipe.transform(text3);
    const result4 = pipe.transform(text4);
    const result5 = pipe.transform(text5);
    const result6 = pipe.transform(text6);

    // then
    expect(result1).toBe('MICHAEL JORDAN');
    expect(result2).toBe('MICHAEL JORDAN');
    expect(result3).toBe('MICHAEL 23 JORDAN');
    expect(result4).toBe(123);
    expect(result5).toBe(undefined);
    expect(result6).toBe(null);
  });
});
