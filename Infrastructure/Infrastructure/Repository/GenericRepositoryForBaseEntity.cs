using Application.Repository;
using Domain.Model;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class GenericRepositoryForBaseEntity<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ShiftDbContext _shiftDbContext;

        public GenericRepositoryForBaseEntity(ShiftDbContext shiftDbContext)
        {
            _shiftDbContext = shiftDbContext ?? throw new ArgumentNullException(nameof(shiftDbContext));
        }


        public T Add(T entity)
        {
            _shiftDbContext.Add(entity);
            _shiftDbContext.SaveChanges();
            return entity;
        }
        public async Task<T> AddAsync(T entity)
        {
            await _shiftDbContext.AddAsync(entity);
            await _shiftDbContext.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<List<T>> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> queryable = _shiftDbContext.Set<T>();
            foreach (Expression<Func<T, object>> include in includes)
            {
                queryable = queryable.Include(include);
            }
            if (filter != null)
            {
                queryable = queryable.Where(filter);
            }
            if (orderBy != null)
            {
                queryable = orderBy(queryable);
            }
            return await queryable.ToListAsync();
        }

        public virtual Task<List<T>> Get(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes)
        {
            return Get(filter, null, includes);
        }

        public virtual async Task<List<T>> GetAll()
        {
            return await _shiftDbContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetById(Guid id)
        {
            return await _shiftDbContext.Set<T>().FindAsync(id);
        }


        public virtual async Task<T> GetByIdAsync(Guid id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> queryable = _shiftDbContext.Set<T>();
            foreach (Expression<Func<T, object>> include in includes)
            {
                queryable = queryable.Include(include);
            }
            return await queryable.FirstOrDefaultAsync(i => i.Id == id);

        }


        public virtual async Task<T> GetSingleAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> queryable = _shiftDbContext.Set<T>();
            foreach (Expression<Func<T, object>> include in includes)
            {
                queryable = queryable.Include(include);
            }
            return await queryable.Where(expression).FirstOrDefaultAsync();
        }

        public virtual T Update(T entity)
        {
            _shiftDbContext.Set<T>().Update(entity);
            _shiftDbContext.SaveChanges();
            return entity;
        }
        public void Remove(T entity)
        {
            _shiftDbContext.Set<T>().Remove(entity);
            _shiftDbContext.SaveChanges();
        }
    }
}
